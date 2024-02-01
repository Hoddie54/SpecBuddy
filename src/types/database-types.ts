export type SpecPoint = {
  title: string
  description: string
  videoLink: string
  videoLink2: string
  videoLink3: string
  notesLink1: string
  notesLink2: string
  notesLink3: string
  topicId: number
  subtopicId: number
  specpointId: number
  specpointNumber: string
  subject: string
  examBoard: string
  higherTier: boolean
  subjectOnly: boolean
}

export type SubTopic = {
  title: string
  specpoints: SpecPoint[]
  topicId: number
  subtopicId: number
  subject: string
  examBoard: string
  higherTier: boolean
}

export type Topic = {
  title: string
  subtopics: SubTopic[]
  topicId: number
  subject: string
  examBoard: string
  higherTier: boolean
}

export type Subject = {
  subject: string
  examBoard: string
  topics: Topic[]
}

export enum Rating {
  RED,
  AMBER,
  GREEN,
}

export type UserData = {
  authProvider: string
  email: string
  name: string
  uid: string
  ratings: any
  schoolName?: string
  yearGroup?: number
  subjects?: SettingsSubject[]
}

export type Question = {
  text: string
  options: string[]
  correctAnswer: number
  explanation: string
  subject: string
  examBoard: string
  topicId: number
  subtopicId: number
  specpointId: number
  questionId: number
}

export type SettingsSubject = {
  name: string
  examBoard: string
}

export type SettingsData = {
  name: string
  email: string
  schoolName: string
  yearGroup: number
  subjects: SettingsSubject[]
}
