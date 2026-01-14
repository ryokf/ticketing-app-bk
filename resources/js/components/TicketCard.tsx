interface TicketCardProps {
    type: string;
    price: number;
    stock: number;
    selected?: boolean;
    onSelect?: () => void;
}

export default function TicketCard({
    type,
    price,
    stock,
    selected = false,
    onSelect
}: TicketCardProps) {
    return (
        <div
            className={`card-brutalist-no-hover cursor-pointer transition-all ${selected ? 'bg-brutalist-accent' : ''
                }`}
            onClick={onSelect}
        >
            <div className="flex items-center justify-between">
                {/* Radio Button */}
                <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 border-3 border-black ${selected ? 'bg-black' : 'bg-white'
                        }`}>
                        {selected && (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="w-3 h-3 bg-brutalist-accent"></div>
                            </div>
                        )}
                    </div>

                    {/* Ticket Info */}
                    <div>
                        <div className="font-bold uppercase text-lg">{type}</div>
                        <div className="text-sm">STOK: {stock}</div>
                    </div>
                </div>

                {/* Price */}
                <div className="text-right">
                    <div className="text-xs font-bold uppercase">HARGA</div>
                    <div className="text-2xl font-bold">
                        Rp {price.toLocaleString('id-ID')}
                    </div>
                </div>
            </div>
        </div>
    );
}
