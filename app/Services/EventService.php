<?php

namespace App\Services;

use App\Models\Event;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;

class EventService
{
    public function __construct(protected TicketService $ticketService) {}

    public function getAllEvent()
    {
        $events = [];

        foreach (Event::all() as $event) {
            $events[] = [
                'id' => $event->id,
                'title' => $event->title,
                'date' => $event->time,
                'location' => $event->location,
                'category' => $event->category->name,
                'image' => $event->photo,
            ];
        }

        return $events;
    }

    public function getDetailEvent($id)
    {
        $event = Event::with(['ticket', 'category'])->find($id);

        $event = [
            'id' => $event->id,
            'user_id' => $event->user_id,
            'category_id' => $event->category_id,
            'title' => $event->title,
            'description' => $event->description,
            'date' => $event->time,
            'location' => $event->location,
            'category' => $event->category->name,
            'image' => $event->photo,
        ];


        $event['tickets'] = $this->ticketService->getTicketByEvent($id);

        return $event;
    }

    /**
     * Get all events for admin panel with category, user, and formatted dates
     */
    public function getAllEventsForAdmin(): array
    {
        $events = [];

        $eventsData = Event::with('category', 'user')->get();

        foreach ($eventsData as $event) {
            $events[] = [
                'id' => $event->id,
                'title' => $event->title,
                'category' => $event->category?->name ?? 'N/A',
                'location' => $event->location,
                'date' => $event->time,
                'createdBy' => $event->user?->name ?? 'Unknown',
                'createdAt' => $event->created_at->format('Y-m-d H:i'),
            ];
        }

        return $events;
    }

    /**
     * Create a new event
     */
    public function createEvent(array $data, $imageFile = null): Event
    {
        // Handle category - either use existing or create new
        $categoryId = $data['category_id'];

        if (isset($data['new_category']) && !empty($data['new_category'])) {
            // Create new category
            $category = Category::create([
                'name' => $data['new_category']
            ]);
            $categoryId = $category->id;
        }

        // Handle image upload
        $photoPath = null;
        if ($imageFile) {
            $photoPath = $imageFile->store('events', 'public');
            $photoPath = '/storage/' . $photoPath;
        }

        // Create event
        $event = Event::create([
            'user_id' => auth()->id(),
            'category_id' => $categoryId,
            'title' => $data['title'],
            'description' => $data['description'],
            'location' => $data['location'],
            'time' => $data['date'],
            'photo' => $photoPath ?? '/images/default-event.jpg',
        ]);

        return $event;
    }

    /**
     * Update an existing event
     */
    public function updateEvent(int $id, array $data, $imageFile = null): Event
    {
        $event = Event::findOrFail($id);

        // Handle category - either use existing or create new
        $categoryId = $data['category_id'] ?? $event->category_id;

        if (isset($data['new_category']) && !empty($data['new_category'])) {
            // Create new category
            $category = Category::create([
                'name' => $data['new_category']
            ]);
            $categoryId = $category->id;
        }

        // Handle image upload
        if ($imageFile) {
            // Delete old image if it exists and is not the default
            if ($event->photo && $event->photo !== '/images/default-event.jpg') {
                $oldImagePath = str_replace('/storage/', '', $event->photo);
                Storage::disk('public')->delete($oldImagePath);
            }

            $photoPath = $imageFile->store('events', 'public');
            $photoPath = '/storage/' . $photoPath;
        } else {
            // Keep existing photo
            $photoPath = $event->photo;
        }

        // Update event
        $event->update([
            'category_id' => $categoryId,
            'title' => $data['title'] ?? $event->title,
            'description' => $data['description'] ?? $event->description,
            'location' => $data['location'] ?? $event->location,
            'time' => $data['date'] ?? $event->time,
            'photo' => $photoPath,
        ]);

        return $event;
    }

    /**
     * Delete an event
     */
    public function deleteEvent(int $id): bool
    {
        $event = Event::findOrFail($id);

        // Delete image if it exists and is not the default
        if ($event->photo && $event->photo !== '/images/default-event.jpg') {
            $imagePath = str_replace('/storage/', '', $event->photo);
            Storage::disk('public')->delete($imagePath);
        }

        return $event->delete();
    }
}
