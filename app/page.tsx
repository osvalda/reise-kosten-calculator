import { Feature1 } from "@/components/feature1"
import { Footer2 } from "@/components/footer2"
import { Hero45 } from "@/components/hero45"
import { Hero47 } from "@/components/hero47"
import { Navbar1 } from "@/components/navbar1"

export default function Page() {
  return (
    <div className="flex flex-col">
      <Navbar1 />
      <Hero47 />
      <Hero45 />
      <Feature1 />
      <Footer2 className="bg-black" />
    </div>
  )
}
