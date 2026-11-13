import DocPage, { DocSection } from '../components/DocPage'
import Shot from '../components/Shot'
import {A, C, Code, H3, Note, P, Table } from '../components/ui'

export default function ConnectModel() {
  return (
    <DocPage path="/docs/connect-ai-model">

        <DocSection id="how" eyebrow="Overview" title="How Roofle uses a model">
          <P>Transcription happens on your Mac and needs no model. Roofle uses an AI model for: live notes, suggested questions and follow-up actions. Transcript text is sent straight to the provider you choose. Roofle has no server in between.</P>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-muted">
            <li><strong>Any gateway.</strong> If it exposes an OpenAI-compatible endpoint, paste its base URL and it works.</li>
            <li><strong>Any model.</strong> Roofle does not lock you to a list. Type the model name your provider expects.</li>
            <li><strong>Local models work too.</strong> Point Roofle at a model on your own machine and nothing leaves it.</li>
          </ul>
        </DocSection>

        <DocSection id="settings" eyebrow="Setup" title="The three settings">
          <P>Open Settings, then LLM Configuration, and fill in three fields.</P>
          <Table head={['Field', 'What to enter']} rows={[
            ['Base URL', <>The gateway endpoint, usually ending in <C>/v1</C>. See the table below.</>],
            ['Model', <>The model name exactly as your provider spells it, for example <C>gpt-4o-mini</C>.</>],
            ['API key', 'Your key for that provider. Use Show to check what you typed.'],
          ]} />
          <Shot name="settings-llm.webp" alt="LLM Configuration in Settings" />
          <P>Then run the connection test. It confirms the URL, model and key work before your first call.</P>
        </DocSection>

        <DocSection id="gateways" eyebrow="Reference" title="Common gateways and base URLs">
          <P>Copy the base URL for your provider. Providers change endpoints from time to time, so check their docs if a test fails.</P>
          <Table head={['Gateway', 'Base URL', 'Key']} rows={[
            ['OpenAI', <C>https://api.openai.com/v1</C>, 'OpenAI API key'],
            ['OpenRouter', <C>https://openrouter.ai/api/v1</C>, 'OpenRouter key'],
            ['Groq', <C>https://api.groq.com/openai/v1</C>, 'Groq key'],
            ['Together AI', <C>https://api.together.xyz/v1</C>, 'Together key'],
            ['Fireworks AI', <C>https://api.fireworks.ai/inference/v1</C>, 'Fireworks key'],
            ['Mistral', <C>https://api.mistral.ai/v1</C>, 'Mistral key'],
            ['DeepSeek', <C>https://api.deepseek.com</C>, 'DeepSeek key'],
            ['Google Gemini', <C>https://generativelanguage.googleapis.com/v1beta/openai/</C>, 'Gemini API key'],
            ['LiteLLM proxy', <C>http://localhost:4000</C>, 'Your proxy key'],
            ['Ollama (local)', <C>http://localhost:11434/v1</C>, 'None needed'],
            ['LM Studio (local)', <C>http://localhost:1234/v1</C>, 'None needed'],
            ['llama.cpp server (local)', <C>http://localhost:8080/v1</C>, 'None needed'],
          ]} />
          <P>Using a company gateway or another provider not listed? Ask for its OpenAI-compatible base URL and use that.</P>
        </DocSection>

        <DocSection id="openai" eyebrow="Example" title="Using OpenAI">
          <P>Create a key at <A href="https://platform.openai.com/api-keys">platform.openai.com/api-keys</A>, set the base URL to <C>https://api.openai.com/v1</C>, pick a model and paste the key. Keep the key private, and if it leaks, delete it on the OpenAI dashboard and create a new one.</P>
        </DocSection>

        <DocSection id="local" eyebrow="Example" title="Using a local model">
          <P>A local model keeps everything on your Mac. Transcription is already on-device, so with a local model no meeting content leaves your machine.</P>
          <H3>With Ollama</H3>
          <Code>{`brew install ollama
ollama pull llama3.1
ollama serve`}</Code>
          <P>Then in Roofle, set Base URL to <C>http://localhost:11434/v1</C> and Model to <C>llama3.1</C>. Local servers do not check the key. If the field will not stay empty, enter any placeholder such as <C>local</C>.</P>
          <H3>With LM Studio or llama.cpp</H3>
          <P>Start the local server in the app, copy the address it shows (see the table above), and use the model name it lists.</P>
          <Note title="Expect a speed trade-off" warn>Small local models are private and free but slower and less sharp than hosted ones, especially on older Macs. If notes lag during a call, try a smaller model or a hosted one.</Note>
        </DocSection>

        <DocSection id="models" eyebrow="Recommendation" title="Which model to choose">
          <P>Roofle makes frequent, short requests during a call, so speed and cost matter more than the largest model. A small, fast model is the right starting point.</P>
          <Table head={['Goal', 'Recommended', 'Why']} rows={[
            ['Default for most people', <C>gpt-4o-mini</C>, 'Fast, inexpensive and good enough for notes and questions.'],
            ['Higher quality notes', 'A larger model from your provider', 'Better judgement on subtle gaps, at higher cost and some added delay.'],
            ['Lowest latency', 'A small model on Groq or similar', 'Questions appear sooner after the words are spoken.'],
            ['Fully private', <>A local model such as <C>llama3.1</C></>, 'Nothing leaves your Mac. Use a recent Apple Silicon Mac.'],
          ]} />
          <P>Start with the default, then change only if you notice a problem. You can switch models at any time, and the connection test tells you straight away if the name is wrong.</P>
        </DocSection>

        <DocSection id="trouble" eyebrow="Help" title="If the connection test fails">
          <Table head={['Symptom', 'What to check']} rows={[
            ['Unauthorized or invalid key', 'Re-paste the key with Show on. Make sure it belongs to the gateway in the Base URL.'],
            ['Model not found', 'Copy the model name from your provider exactly. Names differ between gateways.'],
            ['Cannot connect', <>Check the Base URL, including <C>/v1</C>. For local models, confirm the server is running.</>],
            ['Works, but notes are slow', 'Use a smaller or faster model, or raise Notes update interval under Live session.'],
          ]} />
          <P>More in <A href="/docs#troubleshooting">Troubleshooting</A>.</P>
        </DocSection>
    </DocPage>
  )
}
