interface DigitalTicketProps {
    orderNumber: string;
    eventName: string;
    eventDate: string;
    eventLocation: string;
    tickets: {
        type: string;
        qty: number;
        subtotal: number;
    }[];
    totalPrice: number;
    purchaseDate: string;
}

export default function DigitalTicket({
    orderNumber,
    eventName,
    eventDate,
    eventLocation,
    tickets,
    totalPrice,
    purchaseDate
}: DigitalTicketProps) {

    console.log(tickets)

    return (
        <div className="border-dashed-brutalist bg-white p-6 max-w-md mx-auto">
            {/* Header */}
            <div className="text-center border-b-2 border-dashed border-black pb-4 mb-4">
                <div className="text-2xl font-bold uppercase">TIKET DIGITAL</div>
                <div className="text-xs mt-2">ORDER #{orderNumber}</div>
            </div>

            {/* Event Details */}
            <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between border-b border-dashed border-black pb-2">
                    <span className="font-bold">EVENT:</span>
                    <span className="text-right">{eventName}</span>
                </div>

                <div className="flex justify-between border-b border-dashed border-black pb-2">
                    <span className="font-bold">TANGGAL:</span>
                    <span>{eventDate}</span>
                </div>

                <div className="flex justify-between border-b-2 border-black pb-2">
                    <span className="font-bold">LOKASI:</span>
                    <span className="text-right">{eventLocation}</span>
                </div>

                <div className="grid grid-cols-5 border-b border-dashed border-black pb-2">
                    <span className="font-bold col-span-3">TIPE TIKET</span>
                    <span className="font-bold">JUMLAH</span>
                    <span className="font-bold text-right">Subtotal</span>
                </div>


                {
                    tickets.map((ticket) => (
                        <div key={ticket.qty} className="grid grid-cols-5 border-b border-dashed border-black pb-2">
                            <span className="col-span-3">
                            {ticket.type}

                            </span>
                            <span className="text-center">
                            {ticket.qty}x
                            </span>
                            <span className="text-right">
                            {ticket.subtotal}
                            </span>
                        </div>
                    ))
                }

                {/* <span>{tickets}</span>
                    <span>{quantity}x</span> */}

                <div className="flex justify-between border-b-2 border-black pb-2 pt-2">
                    <span className="font-bold text-lg">TOTAL:</span>
                    <span className="font-bold text-lg">Rp {totalPrice.toLocaleString('id-ID')}</span>
                </div>

                <div className="flex justify-between pt-2">
                    <span className="text-xs">TANGGAL PEMBELIAN:</span>
                    <span className="text-xs">{purchaseDate}</span>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center border-t-2 border-dashed border-black pt-4 mt-4">
                <div className="text-xs">TERIMA KASIH ATAS PEMBELIAN ANDA</div>
                <div className="text-xs mt-1">SIMPAN TIKET INI UNTUK VERIFIKASI</div>
            </div>
        </div>
    );
}
