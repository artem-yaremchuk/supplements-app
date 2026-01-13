import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { emailColors } from './styles/colors';

interface WelcomeEmailProps {
  name: string;
  frontendUrl: string;
}

const WelcomeEmail = ({ name, frontendUrl }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Start exploring evidence-based supplements</Preview>

    <Body
      style={{
        backgroundColor: emailColors.uiBg,
        fontFamily: 'Roboto, Arial, sans-serif',
        color: emailColors.mainText,
      }}
    >
      <Container style={{ padding: '24px 0' }}>
        <Text
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: emailColors.accent,
            textAlign: 'center',
            marginBottom: '24px',
          }}
        >
          SupplementsApp
        </Text>
        <Text style={{ fontSize: '16px', lineHeight: '26px' }}>Hi {name},</Text>

        <Text style={{ fontSize: '16px', lineHeight: '26px' }}>
          Welcome to <strong>Supplements App!</strong> Explore supplements, evidence, and save your
          favorites.
        </Text>

        <Section style={{ textAlign: 'center', margin: '28px 0' }}>
          <Button
            href={frontendUrl}
            style={{
              backgroundColor: emailColors.buttonBg,
              color: emailColors.uiBg,
              padding: '12px 20px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '16px',
            }}
          >
            Open Supplements App
          </Button>
        </Section>

        <Text style={{ fontSize: '14px', lineHeight: '22px', color: emailColors.secondaryText }}>
          If you didn’t create this account, you can safely ignore this email.
        </Text>

        <Hr style={{ borderColor: emailColors.border, margin: '20px 0' }} />

        <Text style={{ fontSize: '12px', color: emailColors.mutedText, margin: '0' }}>
          Supplements App
        </Text>
        <Text style={{ fontSize: '12px', color: emailColors.mutedText, margin: '2px 0 0' }}>
          Evidence-based supplements encyclopedia
        </Text>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;
