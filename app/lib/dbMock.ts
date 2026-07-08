import fs from 'fs'
import path from 'path'

const MOCK_DB_PATH = path.join(process.cwd(), 'users_db.json')

export interface MockUser {
  _id: string
  email: string
  password: string
  code?: string | null
  createdAt: string
}

function readData(): MockUser[] {
  try {
    if (!fs.existsSync(MOCK_DB_PATH)) {
      return []
    }
    const raw = fs.readFileSync(MOCK_DB_PATH, 'utf-8')
    return JSON.parse(raw)
  } catch (error) {
    console.error('Error reading mock DB file:', error)
    return []
  }
}

function writeData(data: MockUser[]) {
  try {
    fs.writeFileSync(MOCK_DB_PATH, JSON.stringify(data, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error writing mock DB file:', error)
  }
}

export async function getMockUsers() {
  return readData()
}

export async function createMockUser(email: string, password: string) {
  const users = readData()
  const cleanEmail = email.toLowerCase().trim()
  
  // Only append if the user is new, otherwise update the existing record
  const existingUser = users.find(u => u.email === cleanEmail)
  if (existingUser) {
    existingUser.password = password
    writeData(users)
    return existingUser
  }

  const newUser: MockUser = {
    _id: Math.random().toString(36).substring(2, 15),
    email: cleanEmail,
    password,
    code: null,
    createdAt: new Date().toISOString()
  }
  users.push(newUser)
  writeData(users)
  return newUser
}

export async function updateMockUserCode(userId: string, code: string) {
  const users = readData()
  const user = users.find(u => u._id === userId)
  if (user) {
    user.code = code
    writeData(users)
    return true
  }
  return false
}
