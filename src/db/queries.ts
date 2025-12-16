import { db } from "./index"
import { people } from "./schema"
import { eq, desc, sql } from "drizzle-orm"

export function ListAllData(){
    return db.select().from(people).orderBy(desc(people.id)).all()
}

export function CreatePerson(name: string, remarks?: string, worth: number = 0){
    const added = Math.floor(Date.now()/1000)
    const res = db.insert(people).values({
        name,
        remarks,
        added,
        worth,
    }).run()
    // @ts-ignore
    return { id: Number(res.lastInsertRowid) }
}

export function addWorth(id: number) {
    const res = db.update(people)
        .set({ worth: sql`${people.worth} + 1` })
        .where(eq(people.id, id))
        .run()
    // @ts-ignore
    return { changes: res.changes }
}
export function lowerWorth(id: number) {
    const res = db.update(people)
        .set({ worth: sql`${people.worth} - 1` })
        .where(eq(people.id, id))
        .run()
    // @ts-ignore
    return { changes: res.changes }
}
export function deleteGuy(id:number){
    const res=db.delete(people).where(eq(people.id, id)).run()
    // @ts-ignore
    return { changes: res.changes }
}
