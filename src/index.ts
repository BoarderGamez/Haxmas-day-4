import { Hono } from "hono"
import { ListAllData,CreatePerson,addWorth,lowerWorth,deleteGuy } from "./db/queries";
const app = new Hono()

app.get("/", (c) => c.text("Beans!"))

app.get("/api/people", (c) => c.json(ListAllData()))

app.post("/api/people", async (c) => {
  const body = await c.req.json().catch(() => null)
  const name = (body?.name ?? "").toString().trim()
  if (!name) return c.json({ error: "name is required" }, 400)

  return c.json(CreatePerson(name), 201)
})

app.patch("/api/people/:id/worth/add", (c) => {
  const id = Number(c.req.param("id"))
  if (!Number.isFinite(id)) return c.json({ error: "bad id" }, 400)

  const res = addWorth(id)
  if (res.changes === 0) return c.json({ error: "not found" }, 404)

  return c.json({ ok: true })
})
app.patch("/api/people/:id/worth/lower", (c) => {
  const id = Number(c.req.param("id"))
  if (!Number.isFinite(id)) return c.json({ error: "bad id" }, 400)

  const res = lowerWorth(id)
  if (res.changes === 0) return c.json({ error: "not found" }, 404)

  return c.json({ ok: true })
})
app.delete("/api/people/:id", (c) => {
  const id = Number(c.req.param("id"))
  if (!Number.isFinite(id)) return c.json({ error: "bad id" }, 400)

  const res = deleteGuy(id)
  if (res.changes === 0) return c.json({ error: "not found" }, 404)

  return c.json({ ok: true })
})
const port = Number(process.env.PORT) || 3000

export default {
  port,
  fetch: app.fetch,
}