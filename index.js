const core = require('@actions/core');
const getCert = require('./get-cert');
const {GistBox} = require('gist-box');

async function run() {
  try {
    const GIST_ID = core.getInput('gist_id');
    const GITHUB_PAT = core.getInput('github_pat');

    const sitesInput = core.getInput('sites', {required: true});
    const sites = sitesInput.split(/\s*,\s*/).filter(s => s && s.startsWith('https'));
    const certs = await Promise.all(sites.map(async site => {
      try {
        const cert = await getCert(site);
        const {infoAccess, issuer, subject, valid_from, valid_to} = cert;
        const result = { ok: true, site, infoAccess, issuer, subject, valid_from, valid_to, last_check: Date.now()};
        return result
      } catch (e) {
        return {ok: false, site, message: e.message, last_check: Date.now()};
      }
    }));
    core.debug(certs);
    core.setOutput('cert_data', certs);
    const jsonData = JSON.stringify(certs, null, 2);
    const box = new GistBox({id: GIST_ID, token: GITHUB_PAT});
    try {
      await box.update({
        filename: 'cert_status.json',
        description: 'Certificate status',
        content: jsonData
      })
    } catch (e) {
      core.setFailed(`Action failed with error ${e}`);
    }
  } catch (e) {
    core.setFailed(`Action failed with error ${e}`);
  }
}

run();
