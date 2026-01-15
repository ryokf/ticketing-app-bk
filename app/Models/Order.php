<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /** @use HasFactory<\Database\Factories\OrderFactory> */
    use HasFactory;

    public function detailOrders() {
        $this->hasMany(DetailOrder::class);
    }

    public function User(){
        $this->belongsTo(User::class);
    }

    public function event(){
        $this->belongsTo(Event::class);
    }
}
