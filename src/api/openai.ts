import OpenAI from "openai";

// const propmtText = 'You are a helpful fitness assistant. Answer the users questions related to workouts, nutrition, or motivation.'

const sendToOpenAi = async (prompt: string): Promise<string> => {
const apiKey = process.env.OPEN_API_KEY

if(!apiKey){
 throw new Error("OpenAPI key is not find")
}

const response = await fetch('https://api.openai.com/v1/chat/completions', {
 method: 'POST',
 headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${apiKey}`
 },
 body: JSON.stringify({
  model: 'gpt-3.5-turbo',
  messages: [
   {role: 'system', content: prompt}
  ]
 })
})
const data = await response.json()
console.log(data.choises)

}

export default sendToOpenAi