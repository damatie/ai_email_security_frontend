'use client';

import PageTop from '@/app/components/common/PageGreetings/pageTop';
import ConnectCard from '../components/ConnectCard/ConnectCard';
import InfoSection from '../components/InfoSection/InfoSection';

export default function ConnectAccountPage() {
  return (
    <main className=" flex flex-col w-full">
      <PageTop
        title={`Connect Your Email`}
        subTitle="Connect your email account to start protecting your inbox"
      />

      <div className="flex flex-col items-start ">
        <section className="flex  max-w-5xl flex-col md:flex-row justify-start gap-8 gap-x-[22px] mb-8 w-full">
          <ConnectCard
            logo="logos:google-gmail"
            title="Gmail"
            description="Connect your Google Mail account"
            buttonText="Connect Gmail"
          />
          <ConnectCard
            logo="vscode-icons:file-type-outlook"
            title="Outlook"
            description="Connect your Microsoft Outlook account"
            buttonText="Connect Outlook"
          />
        </section>

        <section className="w-full max-w-5xl bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Why connect your email?
          </h2>

          <div className="flex flex-wrap justify-center lg:justify-between gap-4">
            <InfoSection
              icon="mdi:shield-outline"
              title="Real-time Protection"
              description="Get real-time analysis and protection against phishing attempts and malicious emails."
            />

            <InfoSection
              icon="mdi:email-alert-outline"
              title="Risk Labels"
              description="See risk labels directly in your inbox, helping you quickly identify suspicious emails."
            />

            <InfoSection
              icon="mdi:lock-check-outline"
              title="Secure & Private"
              description="Your emails remain private. We only analyze headers and metadata to identify threats."
            />
          </div>
        </section>
      </div>
    </main>
  );
}
