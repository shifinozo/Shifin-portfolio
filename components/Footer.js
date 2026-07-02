export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {year} Muhammed Shifin. All rights reserved.</span>
        <span>Malappuram, Kerala, India</span>
      </div>
    </footer>
  );
}
