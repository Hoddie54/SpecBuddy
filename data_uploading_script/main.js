const fs = require("fs")
const path = require("path")
const csv = require("fast-csv")

const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app")
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore")

/***
 *
 * EDIT PARAMS BELOW
 *
 *
 */

const devMode = true
const subject = "Physics"
const examBoard = "AQA"

/**
 *
 */

let serviceAccount = require(devMode
  ? "./firebase-admin-dev.json"
  : "/firebase-admin-prod.json")

initializeApp({
  credential: cert(serviceAccount),
})

const db = getFirestore()

async function main() {
  //console.log(res)
  const topics = await readCSV("./topics.csv")
  const subtopics = await readCSV("./subtopics.csv")
  const specpoints = await readCSV("./specpoints.csv")

  // console.log(topics)
  // console.log(subtopics)
  // console.log(specpoints)

  specpoints.map((specpoint) => {
    specpoint.specpointId = parseInt(specpoint.specpointId)
    specpoint.subtopicId = parseInt(specpoint.subtopicId)
    specpoint.topicId = parseInt(specpoint.topicId)
    specpoint.higherTier = specpoint.higherTier === "TRUE" ? true : false
    specpoint.examBoard = examBoard
    specpoint.subject = subject
    specpoint.specpointNumber =
      specpoint.topicId +
      "-" +
      specpoint.subtopicId +
      "-" +
      specpoint.specpointId
  })

  subtopics.map((subtopic) => {
    subtopic.subtopicId = parseInt(subtopic.subtopicId)
    subtopic.topicId = parseInt(subtopic.topicId)
    subtopic.examBoard = examBoard
    subtopic.subject = subject
    subtopic.higherTier = subtopic.higherTier === "TRUE" ? true : false
    subtopic.specpoints = specpoints.filter(
      (specpoint) =>
        specpoint.subtopicId === subtopic.subtopicId &&
        specpoint.topicId === subtopic.topicId
    )
  })

  topics.map((topic) => {
    topic.topicId = parseInt(topic.topicId)
    topic.higherTier = topic.higherTier === "TRUE" ? true : false
    topic.subtopics = subtopics.filter(
      (subtopic) => subtopic.topicId === topic.topicId
    )
    topic.examBoard = examBoard
    topic.subject = subject
  })

  const data = { subject: subject, examBoard: examBoard, topics: topics }

  const res = await db.collection("subjects").doc().set(data)
}

async function readCSV(filepath) {
  const data = []

  var queryParameter = () =>
    new Promise((resolve) => {
      let returnLit = []
      csv
        .parseFile(path.resolve(__dirname, filepath), { headers: true })
        .on("data", (data) => {
          returnLit.push(data)
        })
        .on("end", () => {
          resolve(returnLit)
        })
    })

  return await queryParameter()
}

main()
