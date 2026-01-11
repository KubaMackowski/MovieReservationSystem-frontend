
export default function Footer() {
    return (
        <footer className="mt-12 text-center flex flex-col gap-4">
            <div className="flex items-center justify-center gap-6">
                <a className="text-xs text-text-main/40 hover:text-text-main" href="#">Polityka Prywatności</a>
                <a className="text-xs text-text-main/40 hover:text-text-main" href="#">Regulamin</a>
                <a className="text-xs text-text-main/40 hover:text-text-main" href="#">Skontaktuj się z nami</a>
            </div>
            <p className="text-[10px] text-text-main/20 uppercase tracking-widest">© 2026 CineSoft Entertainment</p>
        </footer>
    )
}