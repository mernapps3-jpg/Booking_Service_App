const Footer = () => (
  <footer className="border-t bg-white py-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
    <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <p>ServiceFlow - Book services with confidence.</p>
      <p>(c) {new Date().getFullYear()} ServiceFlow. All rights reserved.</p>
    </div>
  </footer>
)

export default Footer
