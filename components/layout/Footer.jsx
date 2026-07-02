import Container from "@/components/ui/Container";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container className="footer-inner">
        <span>© {year} Muhammed Shifin. All rights reserved.</span>
        <span>Malappuram, Kerala, India</span>
      </Container>
    </footer>
  );
}
