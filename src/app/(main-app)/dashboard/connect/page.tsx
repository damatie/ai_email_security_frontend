'use client';

import PageTop from '@/app/components/common/PageGreetings/pageTop';
import ConnectCard from '../components/ConnectCard/ConnectCard';
import InfoSection from '../components/InfoSection/InfoSection';
import { useConnectWithGmail } from '@/app/lib/api-client-services/Connect/hooks/useGmailAuth ';
import Overlay from '@/app/components/common/BgOverlay/Overlay';
import { FeedbackCard } from '@/app/components/common/FeedbackCard/FeedbackCard';
import { useUserProfile } from '@/app/lib/api-client-services/Profile/hooks/useUserProfile';

export default function ConnectAccountPage() {
  const { data: fetchedProfile } = useUserProfile();
  const { connectGmailAccount, setMsg, isLoading, msg } = useConnectWithGmail();

  const connectedAccount = fetchedProfile?.data?.connectedAccount || 0;

  return (
    <main className=" animate-fade-up flex flex-col w-full">
      <PageTop
        title={`Connect Your Email`}
        subTitle="Connect your email account to start protecting your inbox"
      />

      <div className="flex flex-col items-start ">
        <section className="flex  max-w-5xl flex-col md:flex-row justify-start gap-8 gap-x-[22px] mb-8 w-full">
          <ConnectCard
            onClick={() => {
              connectGmailAccount();
            }}
            isDisabled={isLoading || connectedAccount > 0}
            logo="logos:google-gmail"
            title="Gmail"
            description="Connect your Google Mail account"
            buttonText={isLoading ? 'Connecting...' : 'Connect Gmail'}
          />
          <ConnectCard
            isDisabled={true}
            logo="vscode-icons:file-type-outlook"
            title="Outlook"
            description="Connect your Microsoft Outlook account"
            buttonText="Coming soon!"
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

      <Overlay isOpen={msg ? true : false}>
        <FeedbackCard
          IconName="mdi:email-check-outline"
          containerStyle="text-brand-green"
          title="Connection with Gmail"
          textClass=" max-w-[290px] mx-auto"
          subTitle={msg}
          label="Continue"
          nextAction={() => setMsg('')}
        />
      </Overlay>
    </main>
  );
}
