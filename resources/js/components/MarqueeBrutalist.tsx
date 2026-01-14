export default function MarqueeBrutalist({ text }: { text: string }) {
    return (
        <div className="marquee-brutalist">
            <div className="marquee-brutalist-content">
                {text} {text} {text} {text}
            </div>
        </div>
    );
}
