import React from "react";
import "../styles/Contributors.css";
import { FaLinkedin } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";

/* ====== Logos (group headers) ====== */
import purdueLogo from "../assets/images/Purdue.png";
import toyotaLogo from "../assets/images/Toyota.png";
import osuLogo from "../assets/images/OSU.png";

/* ====== Member headshots (where available) ====== */
import yaobinImg from "../assets/images/Yaobin_Chen.png";
// Name in prompt uses "Chien", filename provided was "Stanley_Chein.png"
import stanleyImg from "../assets/images/Stanley_Chein.png";
import chiChihImg from "../assets/images/Chi-Chih-Chen.png";

/* Helper: safe external link props */
const ext = { target: "_blank", rel: "noopener noreferrer" };

/* Helper: initials for avatar fallback */
const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");

/* Data model */
const GROUPS = [
  {
    org: "Purdue University",
    logo: purdueLogo,
    members: [
      {
        name: "Dr. Yaobin Chen",
        title:
          "Professor of Electrical and Computer Engineering · Director of Transportation & Autonomous Systems Institute",
        img: yaobinImg,
        links: [
          { type: "site", label: "TASI", href: "https://engineering.purdue.edu/TASI" },
          {
            type: "site",
            label: "Purdue ECE Profile",
            href: "https://engineering.purdue.edu/ECE/People/ptProfile?resource_id=296665&group_id=2571",
          },
          {
            type: "linkedin",
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/yaobin-chen-0759a33/",
          },
        ],
      },
      {
        name: "Dr. Stanley Chein",
        title: "Professor of Electrical and Computer Engineering · Purdue University, Indianapolis",
        img: stanleyImg,
        links: [
          {
            type: "site",
            label: "Purdue ECE Profile",
            href: "https://engineering.purdue.edu/ECE/People/ptProfile?resource_id=296594",
          },
          {
            type: "linkedin",
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/stanley-chien-a673993a/",
          },
        ],
      },
    ],
  },

  {
    org: "Toyota",
    logo: toyotaLogo,
    members: [
      {
        name: "Ananna Ahmed",
        title: "Senior Research Scientist",
        img: null, // fallback avatar with initials AA
        links: [],
      },
      {
        name: "To be announced",
        title: "Research Scientist",
        img: null,
        links: [],
      },
      {
        name: "To be announced",
        title: "Research Engineer",
        img: null,
        links: [],
      },
    ],
  },

  {
    org: "Ohio State University",
    logo: osuLogo,
    members: [
      {
        name: "Chi-Chih Chen",
        title: "Research Associate Professor, Electrical and Computer Engineering",
        img: chiChihImg,
        links: [
          {
            type: "site",
            label: "ElectroScience Lab",
            href: "https://electroscience.osu.edu/people/chen.118",
          },
          {
            type: "linkedin",
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/chi-chih-chen-72767156/",
          },
        ],
      },
    ],
  },
];

export default function Contributors() {
  return (
    <div className="contributors-page">
      {/* Background FX */}
      <div className="contributors-mesh" aria-hidden="true">
        <span className="pulse p1" />
        <span className="pulse p2" />
        <span className="pulse p3" />
        <span className="grain" />
      </div>

      <main className="contributors-shell" role="main">
        <header className="contributors-head">
          <h1 className="contributors-title">Contributors</h1>
          <p className="contributors-lede">
            Collaborators across academia and industry advancing micro-Doppler research.
          </p>
        </header>

        {GROUPS.map((g, i) => (
          <section className="org-block" key={g.org}>
            <header className="org-head">
              <img src={g.logo} alt={`${g.org} logo`} className="org-logo" />
              <h2 className="org-name">{g.org}</h2>
            </header>

            <ul className="card-grid">
              {g.members.map((m) => (
                <li className="person-card" key={`${g.org}-${m.name}`}>
                  <div className="card-media">
                    {m.img ? (
                      <img className="avatar" src={m.img} alt={`${m.name} headshot`} />
                    ) : (
                      <div
                        className="avatar avatar--fallback"
                        data-initials={getInitials(m.name)}
                        aria-label={`${m.name} avatar placeholder`}
                      />
                    )}
                    <span className="ring" aria-hidden="true" />
                  </div>

                  <div className="card-body">
                    <h3 className="person-name">{m.name}</h3>
                    <p className="person-title">{m.title}</p>

                    {m.links?.length > 0 && (
                      <div className="link-row">
                        {m.links.map((l) => (
                          <a
                            key={`${m.name}-${l.href}`}
                            href={l.href}
                            className={`badge ${l.type}`}
                            {...ext}
                          >
                            <span className="badge-icon" aria-hidden="true">
                              {l.type === "linkedin" ? <FaLinkedin /> : <FiGlobe />}
                            </span>
                            <span className="badge-text">{l.label}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}
