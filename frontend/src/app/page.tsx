import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Main from "@/components/main/Main";
import SubHeader from "@/components/subHeader/SubHeader";

export default function Home() {
  return (
    <div>
      <div className="header"><Header /></div>
      <div className="header"><SubHeader /></div>
      <div className="header"><Main /></div>
      <div className="header"><Footer /></div>
    </div>
  );
}
