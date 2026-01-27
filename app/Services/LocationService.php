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
}
