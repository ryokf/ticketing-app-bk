import BrutalistButton from './BrutalistButton';

interface EventCardProps {
    id: number;
    title: string;
    date: string;
    location: string;
    category: string;
    image: string;
    onBuyClick?: () => void;
}

export default function EventCard({
    id,
    title,
    date,
    location,
    category,
    image,
    onBuyClick
}: EventCardProps) {
    return (
        <div className="card-brutalist">
            {/* Event Image - Grayscale with color on hover */}
            <div className="mb-4">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover img-brutalist-grayscale border-brutalist"
                />
            </div>

            {/* Event Info with Lines */}
            <div className="space-y-3">
                {/* Category */}
                <div className="border-b-2 border-black pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">
                        {category}
                    </span>
                </div>

                {/* Title */}
                <div className="border-b-2 border-black pb-2">
                    <h3 className="text-xl font-bold uppercase leading-tight">
                        {title}
                    </h3>
                </div>

                {/* Date */}
                <div className="border-b-2 border-black pb-2">
                    <div className="text-xs font-bold uppercase mb-1">TANGGAL:</div>
                    <div className="text-sm">{date}</div>
                </div>

                {/* Location */}
                <div className="border-b-2 border-black pb-2">
                    <div className="text-xs font-bold uppercase mb-1">LOKASI:</div>
                    <div className="text-sm">{location}</div>
                </div>

                {/* Buy Button */}
                <div className="pt-2">
                    <BrutalistButton
                        variant="accent"
                        className="w-full"
                        onClick={onBuyClick}
                    >
                        BELI TIKET
                    </BrutalistButton>
                </div>
            </div>
        </div>
    );
}
