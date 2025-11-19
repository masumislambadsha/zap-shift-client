import React, { useState } from "react";

const tabs = [
  {
    name: "Story",
    content: `
We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Our journey began with a handful of customers who trusted us with their parcels, relying on our dedication to real-time tracking and transparent communication. As our reputation for reliability grew, we expanded our reach and doubled down on our commitment to efficient logistics and customer-first service.

Throughout the years, we've introduced innovative tracking solutions, supporting both businesses and individuals in managing their deliveries with confidence. Whether it’s a birthday present delivered across districts or urgent business contracts needing next-day arrival, every parcel gets our full attention. Satisfied customers, glowing reviews, and word-of-mouth recommendations helped us to grow from a modest operation to a trusted partner for thousands.

We believe that parcel delivery should never be complicated. Our website and mobile app make booking, tracking, and managing shipments effortless. Riders and ground staff receive regular training, ensuring professionalism and care at every step. As we look ahead, our story continues — one successful delivery at a time, continually raising the bar for fast, secure, and hassle-free service.
    `,
  },
  {
    name: "Mission",
    content: `
Our mission is to deliver joy and peace of mind with every shipment. We aim to exceed expectations for speed, reliability, and transparency, making sure customers are always informed and supported. At the heart of our mission is a belief that technology and empathy together can transform logistics into a delightful experience.

We constantly invest in real-time tracking technologies, environmental sustainability measures, and fair pricing models. Our riders are equipped with the latest navigation and safety tools, and our support team responds quickly to every inquiry — whether from a large business or an individual sender. We strive to minimize lost shipments, delays, and inconvenience, driven by our vision of creating a delivery ecosystem that's as dependable as clockwork.

We uphold strict data security standards, protect customer privacy, and leverage insights from customer feedback to shape new initiatives. Our goal is to be the delivery service people recommend to family, friends, and colleagues — not just for speed, but for genuine care, transparency, and trust.
    `,
  },
  {
    name: "Success",
    content: `
Since launching, our company has achieved remarkable success. In just a few years, we've expanded coverage to dozens of cities, processing over 100,000 deliveries and handling shipments for leading companies, small startups, and everyday consumers. Our average delivery time has dropped by 30% thanks to new logistics automation, and customer satisfaction ratings consistently hit 4.9 out of 5.

Critical milestones include launching our proprietary tracking platform, reducing loss rates to less than 0.02% of all parcels, and implementing a rider rewards system for top performers. We've received multiple industry awards for innovation and service quality, and our case studies have been featured in logistics publications nationwide.

Our biggest win is the trust our customers place in us. Repeat orders make up more than 60% of our monthly volume, and some enterprises have chosen us as their exclusive delivery partner. Our rapid success is a testament to passionate teamwork — from the riders who brave long distances, to the developers who build reliable tech, to the support agents who turn stressful situations into smiles.
    `,
  },
  {
    name: "Team & Others",
    content: `
Our team blends experience with energy, uniting logistics experts, tech innovators, marketing strategists, and customer support champions under one roof. Many staff have backgrounds in international courier operations, software engineering, and local delivery startups, creating a culture of resourcefulness and diversity.

We invest continuously in training and empowerment, encouraging every member to propose improvements and share learnings. Culture days, hackathons, and feedback sessions keep morale high, ensuring every employee feels valued. Riders are celebrated for their reliability and safe driving, and our support staff often go above and beyond to resolve issues with warmth and professionalism.

Beyond our internal team, we partner with local retailers, charitable organizations, and tech developers to push the boundaries of what delivery means. By sponsoring community events and offering discounted services for nonprofits, we reinforce our belief that logistics should be more than business — it should be a bridge for building better societies. We proudly welcome all feedback, collaborations, and new ideas.
    `,
  },
];

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="about-us bg-white rounded-2xl p-10 shadow max-w-5xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-green-900 mb-2">About Us</h2>
      <p className="text-xs text-gray-600 mb-8 leading-4">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
      </p>
      <nav className="flex gap-8 mb-6 border-b pb-2 text-gray-600 font-semibold">
        {tabs.map((tab, idx) => (
          <button
            key={tab.name}
            className={
              idx === activeTab
                ? "text-green-700 font-semibold border-b-4 border-lime-400 pb-2"
                : "hover:text-green-700 transition"
            }
            onClick={() => setActiveTab(idx)}
            type="button"
          >
            {tab.name}
          </button>
        ))}
      </nav>
      <div className="text-sm text-gray-700 leading-relaxed space-y-6 whitespace-pre-line">
        {tabs[activeTab].content.split("\n").map(
          (para, i) =>
            para.trim() && <p key={i}>{para.trim()}</p>
        )}
      </div>
    </section>
  );
}
