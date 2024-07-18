const core = require('@actions/core');
const { Octokit } = require("@octokit/action");

const octokit = new Octokit();
const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");

const head = core.getInput('head');
const base = core.getInput('base');

core.info(`merging ${head} to ${base} ...`)

try {
  await octokit.request('POST /repos/{owner}/{repo}/merges', {
    owner: owner,
    repo: repo,
    base: base,
    head: head,
});
} catch(error) {
  // Octokit errors always have a `error.status` property which is the http response code
  if (error.status) {
    // handle Octokit error
  } else {
    // handle all other errors
    throw error;
  }
}
