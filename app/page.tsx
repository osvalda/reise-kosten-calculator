import { Footer2 } from "@/components/footer2"
import { Navbar1 } from "@/components/navbar1"

export default function Page() {
  return (
    <div className="flex flex-col">
      <Navbar1 />
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div className="mb-100">
          {/* <h1 className="text-2xl font-bold">Welcome to AnlagePro</h1>
          <p className="mt-4">
            AnlagePro is a travel cost collector and calculator app that helps you manage your travel expenses efficiently.
          </p> */}
        </div>
      </div>
      <Footer2 />
    </div>
  )
}
