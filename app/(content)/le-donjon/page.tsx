import { getPageDonjon } from "@/lib/api/resources/donjon"

export default async function LeDonjon() {
  const data = await getPageDonjon();
  
  return (
    <section>
      <div>Hello</div>
    </section>
  )
}