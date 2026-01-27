<?php

namespace App\Services;

use App\Models\Location;

class LocationService
{
    public function getAllLocations(): array
    {
        return Location::all()->map(function ($location) {
            return [
                'id' => $location->id,
                'name' => $location->name,
            ];
        })->toArray();
    }

    public function createLocation(string $name): Location
    {
        return Location::create(['name' => $name]);
    }

    public function getLocationById(int $id): ?Location
    {
        return Location::find($id);
    }

    /**
     * Update an existing location
     */
    public function updateLocation(int $id, string $name): ?array
    {
        $location = Location::find($id);

        if (!$location) {
            return null;
        }

        $location->update([
            'name' => $name
        ]);

        return [
            'id' => $location->id,
            'name' => $location->name
        ];
    }

    /**
     * Delete a location
     */
    public function deleteLocation(int $id): bool
    {
        $location = Location::find($id);

        if (!$location) {
            return false;
        }

        return $location->delete();
    }
}
