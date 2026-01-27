<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\LocationService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function __construct(protected LocationService $locationService) {}

    public function index(): Response
    {
        $locations = $this->locationService->getAllLocations();

        return Inertia::render('admin/locations/index', [
            'locations' => $locations,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/locations/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:250|unique:locations,name',
        ]);

        $this->locationService->createLocation($validated['name']);

        return redirect()->route('admin.locations.index')->with('message', 'Lokasi berhasil ditambahkan');
    }

    public function edit(int $id): Response
    {
        $location = $this->locationService->getLocationById($id);

        if (!$location) {
            abort(404);
        }

        return Inertia::render('admin/locations/edit', [
            'location' => [
                'id' => $location->id,
                'name' => $location->name,
            ],
        ]);
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:250|unique:locations,name,' . $id,
        ]);

        $updated = $this->locationService->updateLocation($id, $validated['name']);

        if (!$updated) {
            abort(404);
        }

        return redirect()->route('admin.locations.index')->with('message', 'Lokasi berhasil diupdate');
    }

    public function destroy(int $id): RedirectResponse
    {
        $deleted = $this->locationService->deleteLocation($id);

        if (!$deleted) {
            abort(404);
        }

        return redirect()->route('admin.locations.index')->with('message', 'Lokasi berhasil dihapus');
    }
}
