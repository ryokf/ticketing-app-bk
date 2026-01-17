<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    /** @use HasFactory<\Database\Factories\TicketFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    public function detailOrders() {
        return $this->hasMany(DetailOrder::class);
    }

    public function event(){
        return $this->belongsTo(Event::class);
    }
}
