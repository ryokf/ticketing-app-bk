<?php

namespace App\Services;

use App\Models\Event;

class EventService
{
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

    public function getDetailEvent($id){
        $event = Event::with(['ticket'])->find($id);

        return $event;
    }
}
