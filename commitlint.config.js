// prettier-ignore
const types = [
    { value: 'major',           name: 'major:           (major) 🚀 Create a release commit' },

    { value: 'minor',           name: 'minor:           (minor) 🚀 Create a release commit' },
    { value: 'feat',            name: 'feat:            (minor) ✨ A new feature' },

    { value: 'patch',           name: 'patch:           (patch) 🚀 Create a release commit' },
    { value: 'fix',             name: 'fix:             (patch) 🐛 A bug fix' },
    { value: 'deps',            name: 'deps:            (patch) 📎 Anything related to dependencies' },
    { value: 'perf',            name: 'perf:            (patch) ⚡ A code change that improves performance' },
    { value: 'refactor',        name: 'refactor:        (patch) ♻️  A code change that neither fixes a bug or adds a feature' },
    { value: 'style',           name: 'style:           (patch) 🎨 Anything to scss, css, themes...' },
    { value: 'revert',          name: 'revert:          (patch) ◀️  Reverts a previous commit' },

    { value: 'chore',           name: 'chore:           (none) 🧹 Cleaning the house' },
    { value: 'docs',            name: 'docs:            (none) 📝 Documentation changes' },
    { value: 'test',            name: 'test:            (none) 🧪 Anything related to tests' },
    { value: 'lint',            name: 'lint:            (none) 📑 Markup, white-space, formatting, missing semi-colons...' },
    { value: 'build',           name: 'build:           (none) 🤖 Anything related to build, tools or dev-env' },
    { value: 'config',          name: 'config:          (none) 🔧 Anything related to configuration' },
    { value: 'wip',             name: 'wip:             (none) 🚧 Work in progress' },
];

// prettier-ignore
const scopes = [
    { value: 'repo',            name: 'repo:            anything related to managing the repo itself'},
    { value: 'ci',              name: 'ci:              anything ci specific' },
    { value: 'deploy',          name: 'deploy:          anything deployment specific' },
    { value: 'docs',            name: 'docs:            docs folder' },
    { value: 'tools',           name: 'tools:           anything related to tools'},
    // nx projects will be added in the cli
];

/** @type {import('cz-git').CommitizenGitOptions} */
async function getConfig() {
    const {
        default: {
            utils: { getProjects },
        },
    } = await import("@commitlint/config-nx-scopes");

    const projects = await getProjects();
    projects.map((p) =>
        scopes.push({ value: p, name: `${p}: anything related to ${p}` }),
    );

    return {
        // commitlint options
        extends: [
            "@commitlint/config-conventional",
            "@commitlint/config-nx-scopes",
        ],
        ignores: [
            (message) => message.includes("WIP"),
            (message) => message.includes("[skip ci]"),
        ],
        rules: {
            "type-enum": [
                2,
                "always",
                Object.values(types).map((s) => s.value),
            ],
            "scope-empty": [2, "never"],
            "scope-enum": [
                1,
                "always",
                ["all", ...scopes.map((s) => s.value), projects],
            ],
        },

        // cz-git, czg options
        types,
        enableMultipleScopes: true,
        allowCustomScopes: true,
        allowEmptyScopes: false,
        scopes: [...scopes, ...projects],
    };
}

module.exports = getConfig();
