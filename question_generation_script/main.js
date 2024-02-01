const openai = require("openai")
const fs = require("fs")

const { initializeApp, cert } = require("firebase-admin/app")
const { getFirestore } = require("firebase-admin/firestore")

/***
 *
 * EDIT PARAMS BELOW
 *
 *
 */

const devMode = true
const subject = "Physics"
const examBoard = "AQA"
const gpt4 = true
const specpointStart = 34
const specpointsToDo = 1

const SK = fs.readFileSync("key.env").toString()
const OpenAi = new openai({
  apiKey: SK,
})

const prompt = fs.readFileSync("prompt.txt").toString()

let serviceAccount = require(devMode
  ? "./firebase-admin-dev.json"
  : "/firebase-admin-prod.json")

initializeApp({
  credential: cert(serviceAccount),
})

const db = getFirestore()

async function main() {
  // const r = await getGPTResponse("What does the name Azhar mean?")
  // console.log(r.choices[0])
  const topics = await getAllData("")
  const allSpecPoints = topics.topics
    .map((t) => {
      return t.subtopics.map((s) => {
        return s.specpoints.map((sp) => {
          return { ...sp, description: sp.description.replaceAll("\n", "") }
        })
      })
    })
    .flat()
    .flat()

  // for (let i = 0; i < 0; i++) {
  //   promises.push(new Promise((resolve) => {
  //     const r = await getGPTResponse([
  //       prompt,
  //       ` "${allSpecPoints[i].description}"`,
  //     ])
  //     console.log(r)
  //     resolve()
  //   }))
  // }

  let questions = []

  for (let i = specpointStart; i < specpointStart + specpointsToDo; i++) {
    console.log(
      `Getting questions for ${allSpecPoints[i].specpointNumber}: S-${i}...`
    )
    const r = await getGPTResponse([
      prompt,
      ` "${allSpecPoints[i].description}"`,
    ])
    //console.log(r.choices[0].message)
    console.log(
      `Got questions for ${allSpecPoints[i].specpointNumber}: S-${i}. Uploading to firebase...`
    )
    questions.push(
      await gptResponseToUploadToFirebase(
        r.choices[0].message.content,
        allSpecPoints[i]
      )
    )
    console.log(
      `... Uploaded questions successfully for ${allSpecPoints[i].specpointNumber}: S-${i}`
    )
  }
}

async function getGPTResponse(descriptions) {
  const messages = descriptions.map((m) => {
    return { role: "user", content: m }
  })

  const completion = await OpenAi.chat.completions.create({
    messages: messages,
    model: gpt4 ? "gpt-4" : "gpt-3.5-turbo",
  })

  return completion
}

async function getAllData() {
  const ref = db.collection("subjects")
  const snapshot = await ref.get()
  if (snapshot.empty) {
    console.log("No matching documents.")
    return
  }

  return snapshot.docs[0].data()
}

async function gptResponseToUploadToFirebase(gptResponse, specpoint) {
  const questions = gptResponse.split("\n\n").map((q, i) => {
    const regex = q.includes("\\n") ? "\\n" : "\n"
    //console.log(q)
    const qSplit = q.split(regex).map((a) => a.trim())
    //console.log(qSplit)
    let correctAnswer = -1
    //console.log(qSplit[5])
    try {
      switch (qSplit[5].charAt(16)) {
        case "A":
        case "a":
          correctAnswer = 0
          break
        case "B":
        case "b":
          correctAnswer = 1
          break
        case "C":
        case "c":
          correctAnswer = 2
          break
        case "D":
        case "d":
          correctAnswer = 3
          break
        default:
          throw new Error("Correct answer not recorded correctly\n" + qSplit)
      }
    } catch (e) {
      console.error(e)
      console.error(qSplit)
    }

    return {
      text: qSplit[0],
      options: [
        qSplit[1].replace("A) ", "").replace("a) ", ""),
        qSplit[2].replace("B) ", "").replace("b) ", ""),
        qSplit[3].replace("C) ", "").replace("c) ", ""),
        qSplit[4].replace("D) ", "").replace("d) ", ""),
      ],
      correctAnswer: correctAnswer,
      explanation: qSplit[6],
      subject: specpoint.subject,
      examBoard: specpoint.examBoard,
      topicId: specpoint.topicId,
      subtopicId: specpoint.subtopicId,
      specpointId: specpoint.specpointId,
      questionId: i + 1,
    }
  })
  return await uploadToFirebase(questions)
}

async function uploadToFirebase(q) {
  //console.log("Q ", q)
  await db
    .collection("questions")
    .doc(
      `${q[0].examBoard}-${q[0].subject}-${q[0].topicId}-${q[0].subtopicId}-${q[0].specpointId}`
    )
    .set({ questions: q })
}

main()
