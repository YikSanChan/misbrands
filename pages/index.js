import Head from "next/head";
import { Octokit } from "@octokit/core";

const ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
const OWNER = "mkrl";
const REPO = "misbrands";

export default function Home({ sha, svgPaths }) {
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
          Unofficial{" "}
          <a className="text-blue-600" href="https://github.com/mkrl/misbrands">
            Misbrands
          </a>{" "}
          Showcase{" "}
          <a
            className="github-button"
            href="https://github.com/yiksanchan/misbrands"
            data-show-count="true"
            aria-label="Star yiksanchan/misbrands on GitHub"
          >
            Star
          </a>
        </h1>
        {svgPaths.map((path) => (
          <img
            className="mt-20"
            key={path}
            width="500"
            src={`https://raw.githubusercontent.com/mkrl/misbrands/${sha}/${path}`}
            alt={path}
          />
        ))}
      </main>
      <footer className="flex items-center justify-center w-full h-24 border-t">
        <p>By&nbsp;</p>
        <a
          className="text-white bg-black"
          href="https://twitter.com/yiksanchan"
        >
          @yiksanchan
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const octokit = new Octokit({ auth: ACCESS_TOKEN });

  const commitsResp = await octokit.request(
    "GET /repos/{owner}/{repo}/commits/{ref}",
    {
      owner: OWNER,
      repo: REPO,
      ref: "master",
    }
  );
  const commitsJSON = commitsResp.data;
  const sha = commitsJSON["sha"];

  const treeResp = await octokit.request(
    "GET /repos/{owner}/{repo}/git/trees/{tree_sha}",
    {
      owner: OWNER,
      repo: REPO,
      tree_sha: sha,
    }
  );
  const treeJSON = treeResp.data;
  const svgPaths = treeJSON["tree"]
    .map((e) => e.path)
    .filter((path) => path.endsWith(".svg"));

  return {
    props: {
      sha,
      svgPaths,
    },
  };
}
