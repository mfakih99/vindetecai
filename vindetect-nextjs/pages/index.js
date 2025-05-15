import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    let location = 'Unknown'
    try {
      const res = await fetch('https://ipapi.co/json/')
      const info = await res.json()
      location = \`\${info.city}, \${info.region}, \${info.country_name}\`
    } catch (err) {
      console.warn('Failed to fetch geo info', err)
    }

    const data = new URLSearchParams()
    data.append('email', email)
    data.append('domain', 'VinDetect.ai')
    data.append(
      'timestamp',
      new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York',
        hour12: true,
      })
    )
    data.append('location', location)

    fetch('https://hooks.zapier.com/hooks/catch/12705314/27dagdz/', {
      method: 'POST',
      mode: 'no-cors',
      body: data,
    }).finally(() => setSubmitted(true))
  }

  const features = [
    {
      title: 'Ghost / Synthetic VIN Identification',
      desc: 'Pinpoint hidden or altered VINs with state-of-the-art algorithms to stop auto theft.',
      icon: '👻',
    },
    {
      title: 'Real-Time Alerts',
      desc: 'Receive instant notifications on suspicious VIN events—e.g., temp tags issued for synthetic VINs.',
      icon: '⚡',
    },
    {
      title: 'Easy API Integration',
      desc: 'Seamlessly integrate VinDetect.ai into your existing systems with our RESTful API.',
      icon: '🔗',
    },
    {
      title: 'LPR Camera Integration',
      desc: 'Effortlessly connect with License Plate Recognition cameras for automated VIN checks.',
      icon: '📷',
    },
    {
      title: 'DMV Database AI Scan',
      desc: 'Run our AI on DMV VIN records to identify vehicles registered with synthetic VINs.',
      icon: '🏛️',
    },
    {
      title: 'Re-VINned Car Detection',
      desc: 'Identify vehicles that have had their VINs tampered, re-assigned, or cloned to mask their true identities.',
      icon: '🔄',
    },
  ]

  return (
    <>
      <Head>
        <title>VinDetect.ai — Coming Soon</title>
        <meta
          name="description"
          content="VinDetect.ai is the first solution of its kind: AI-driven VIN detection for government agencies to identify stolen vehicles with synthetic VINs."
        />
        <meta name="keywords" content="VIN detection, AI, auto theft, synthetic VINs, government" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="container">
        <h1 className="logo">
          <span className="gradient-text">V</span>in
          <span className="gradient-text-alt">D</span>etect.ai
        </h1>
        <p className="tagline">
          The first solution of its kind: AI-powered VIN detection for government
          agencies.
        </p>

        {!submitted ? (
          <form className="email-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Request More Info</button>
          </form>
        ) : (
          <p className="thank-you">Thank you! We’ll be in touch soon.</p>
        )}

        <section className="features">
          {features.map((f) => (
            <div key={f.title} className="card">
              <div className="icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}
