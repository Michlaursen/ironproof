/*
 * PUBLIC TECHNICAL RECORD — external credibility band + published research.
 * Data lifted verbatim from the site content (attributions + corpus in en.ts):
 * real upstream commits/patches that credit the work, plus the arXiv preprints.
 * Every card is an external link (new tab).
 */

const RECORD: { org: string; body: string; cta: string; href: string }[] = [
  {
    org: "IBM",
    body: "The sarama fix commit reads: “Thanks to Dominik Blain of Cobalt AI for reporting.”",
    cta: "View commit",
    href: "https://github.com/IBM/sarama/commit/b01879002b37abe3b44a957615d982847a44da94",
  },
  {
    org: "GnuPG",
    body: "Two libksba commits carry “Reported-by: Dominik Blain”, shipped in release 1.7.0.",
    cta: "View commit",
    href: "https://github.com/gpg/libksba/commit/c44cc98460ea42e393214dc6e23ff746196baefd",
  },
  {
    org: "Mozilla",
    body: "Reported by Dominik Blain — recorded and resolved in Mozilla’s public bug tracker (NSS, CWE-195).",
    cta: "View bug record",
    href: "https://bugzilla.mozilla.org/show_bug.cgi?id=2027434",
  },
  {
    org: "Red Hat · OpenELA",
    body: "Public libyang patches credit Dominik Blain and Cobalt AI for reporting two memory-corruption issues.",
    cta: "View patch record",
    href: "https://github.com/openela-main/libyang",
  },
  {
    org: "wolfSSL",
    body: "Security fixes credited to Dominik Blain in the wolfSSL 5.9.2 release notes.",
    cta: "View release notes",
    href: "https://github.com/wolfSSL/wolfssl/blob/master/README.md",
  },
  {
    org: "VideoLAN · VLC",
    body: "A vulnerability fix carrying Dominik Blain’s name is preserved in VLC’s public source tree.",
    cta: "View patch",
    // Pinned SHA (not blob/master): VLC upstreamed upnp and dropped the local patch,
    // so master 404s. 30d1805 is the last commit where the file exists (verified 200).
    href: "https://github.com/videolan/vlc/blob/30d180596d6884d3d03bd03515b483933bd02cd6/contrib/src/upnp/0006-uri.c-Dominik-Blain-s-fix-for-vulnerability.patch",
  },
  {
    org: "OFFIS · DCMTK",
    body: "Three commits thank Dominik Blain for the report.",
    cta: "View commit",
    href: "https://github.com/DCMTK/dcmtk/commit/63b0bae751f62ed1b384141fa0fd032c98af57aa",
  },
  {
    org: "pupnp · CVE-2026-41682",
    body:
      "The pupnp advisory reads: “found by COBALT static analyzer (Dominik Blain, QreativeLab) on 2026-04-17.” CWE-195, signed-to-unsigned conversion in parse_uri().",
    cta: "View advisory",
    href: "https://github.com/pupnp/pupnp/security/advisories/GHSA-q522-6w45-4j58",
  },
  {
    org: "libmodbus",
    body: "The fix commit reads: “Reported by Dominik Blain — Qreativelab Formal Verification.”",
    cta: "View commit",
    href: "https://github.com/stephane/libmodbus/commit/d6941168d13cfa1db1bec40ef5bf04470c351175",
  },
];

const PAPERS: { id: string; title: string; href: string }[] = [
  {
    id: "arXiv:2604.05292",
    title:
      "Broken by Default: A Formal Verification Study of Security Vulnerabilities in AI-Generated Code",
    href: "https://arxiv.org/abs/2604.05292",
  },
  {
    id: "arXiv:2604.06712",
    title:
      "Broken Quantum: A Systematic Formal Verification Study of Security Vulnerabilities Across the Open-Source Quantum Computing Simulator Ecosystem",
    href: "https://arxiv.org/abs/2604.06712",
  },
  {
    id: "arXiv:2604.12172",
    title: "COBALT-TLA: A Neuro-Symbolic Verification Loop for Cross-Chain Bridge Vulnerability Discovery",
    href: "https://arxiv.org/abs/2604.12172",
  },
  {
    id: "arXiv:2604.20496",
    title:
      "Mythos and the Unverified Cage: Z3-Based Pre-Deployment Verification for Frontier-Model Sandbox Infrastructure",
    href: "https://arxiv.org/abs/2604.20496",
  },
];

function ExternalArrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M7 17 L17 7 M9 7 h8 v8" />
    </svg>
  );
}

export function Credibility() {
  return (
    <section id="record" className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-28 md:px-14">
      <div className="fade-up mb-16 text-center">
        <p className="track-mid mb-4 text-xs text-neutral-400">PUBLIC TECHNICAL RECORD</p>
        <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
          Credited in the open,
          <br />
          by the projects themselves
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-neutral-300">
          Evidence you can inspect outside our website — real upstream commits, patches and bug
          records that name the work.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {RECORD.map((item) => (
          <a
            key={item.org}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="card-premium group flex flex-col p-6 transition"
          >
            <h3 className="metal-text mb-2 font-serif text-xl">{item.org}</h3>
            <p className="flex-1 text-sm font-light leading-relaxed text-neutral-300">{item.body}</p>
            <span className="track-mid mt-5 inline-flex items-center gap-2 text-xs text-neutral-400 transition group-hover:text-white">
              {item.cta}
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                <ExternalArrow />
              </span>
            </span>
          </a>
        ))}
      </div>

      {/* Published research */}
      <div className="fade-up mt-16">
        <p className="track-mid mb-6 text-center text-xs text-neutral-400">PUBLISHED RESEARCH</p>
        <div className="mx-auto max-w-4xl space-y-3">
          {PAPERS.map((paper) => (
            <a
              key={paper.id}
              href={paper.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card-premium group flex items-center gap-4 p-5 transition"
            >
              <span className="metal-text shrink-0 font-mono text-xs">{paper.id}</span>
              <span className="flex-1 text-sm font-light leading-snug text-neutral-300">
                {paper.title}
              </span>
              <span className="icon-metal shrink-0 transition group-hover:text-white">
                <ExternalArrow />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
