// src/pages/Contributors.jsx
import React from "react";
import "../styles/Contributors.css";
import { FaLinkedin } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";

import purdueLogo from "../assets/images/Purdue.png";
import toyotaLogo from "../assets/images/Toyota.png";
import osuLogo from "../assets/images/OSU.png";

import yaobinImg from "../assets/images/Yaobin_Chen.png";
import stanleyImg from "../assets/images/Stanley_Chein.png";
import chiChihImg from "../assets/images/Chi-Chih-Chen.png";

const ext = { target: "_blank", rel: "noopener noreferrer" };

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");

// Groups with members
const GROUPS = [
  {
    org: "Purdue University",
    logo: purdueLogo,
    members: [
      {
        name: "Dr. Stanley Chein",
        title:
          "Professor of Electrical and Computer Engineering · Purdue University, Indianapolis",
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
      {
        name: "Dr. Yaobin Chen",
        title: "Professor of Electrical and Computer Engineering · Director of TASI",
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
      { name: "To be announced", title: "Faculty Member", img: null, links: [] },
      { name: "To be announced", title: "Researcher", img: null, links: [] },
      { name: "To be announced", title: "Graduate Student", img: null, links: [] },
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
      { name: "To be announced", title: "Professor", img: null, links: [] },
      { name: "To be announced", title: "Researcher", img: null, links: [] },
      { name: "To be announced", title: "Graduate Student", img: null, links: [] },
    ],
  },
  {
    org: "Toyota",
    logo: toyotaLogo,
    members: [
      { name: "Ananna Ahmed", title: "Senior Research Scientist", img: null, links: [] },
      { name: "To be announced", title: "Research Scientist", img: null, links: [] },
      { name: "To be announced", title: "Research Engineer", img: null, links: [] },
      { name: "To be announced", title: "Team Member", img: null, links: [] },
      { name: "To be announced", title: "Team Member", img: null, links: [] },
    ],
  },
];

export default function Contributors() {
  return (
    <div className="contributors-page">
      <main className="contributors-shell">
        {/* Centered Page Header */}
        <header className="contributors-header">
          <h1>Contributors</h1>
          <p>
            Collaborators across academia and industry advancing micro-Doppler research.
          </p>
        </header>

        {/* Organization Sections */}
        <div className="contributors-grid">
          {GROUPS.map((g) => (
            <section className="org-block" key={g.org}>
              <header className="org-head">
                <img src={g.logo} alt={`${g.org} logo`} className="org-logo" />
                <h2 className="org-name">{g.org}</h2>
              </header>

              <ul className="person-grid">
                {g.members.map((m) => (
                  <li className="person-card" key={`${g.org}-${m.name}`}>
                    <div className="card-media">
                      {m.img ? (
                        <img className="avatar" src={m.img} alt={`${m.name} headshot`} />
                      ) : (
                        <div
                          className="avatar avatar--fallback"
                          data-initials={getInitials(m.name)}
                        />
                      )}
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
                              {l.type === "linkedin" ? <FaLinkedin /> : <FiGlobe />}
                              <span>{l.label}</span>
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
        </div>
      </main>
    </div>
  );
}
