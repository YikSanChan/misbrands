import Head from 'next/head'

const names = [
  "ferris",
  "github",
  "javascript",
  "pip",
  "rails",
  "react",
  "rust",
  "ubuntu",
  "vscode"
]

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Misbrands</title>
        <link rel="icon" href="/favicon.ico" />
        <script async defer src="https://buttons.github.io/buttons.js"></script>
        <script async src="https://cdn.splitbee.io/sb.js"></script>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-3xl font-bold">
        Unofficial <a className="text-blue-600" href="https://github.com/mkrl/misbrands">Misbrands</a> Showcase <a class="github-button" href="https://github.com/yiksanchan/misbrands" data-show-count="true" aria-label="Star yiksanchan/misbrands on GitHub">Star</a>
        </h1>
        {names.map(name => (
          <img key={name} width="500" height="500" src={`https://raw.githubusercontent.com/mkrl/misbrands/456ea8aa2c7873123dce3d746528bb9a3b6dd139/${name}.svg`} alt="a" />
        ))}
      </main>
    </div>
  )
}

// export async function getStaticProps() {
//   const res = await fetch('https://api.github.com/repos/mkrl/misbrands/commits/master', {
//     headers: {
//       'Accept': 'application/vnd.github.v3+json'
//     }
//   })
//   const json = await res.json()
//   return {
//     props: {
//       json
//     }
//   }
// }