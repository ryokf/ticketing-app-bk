<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailOrder extends Model
{
    /** @use HasFactory<\Database\Factories\DetailOrderFactory> */
    use HasFactory;

    public function ticket(){
        return $this->belongsTo(Ticket::class);
    }

    public function Order(){
        return $this->belongsTo(Order::class);
    }
}
