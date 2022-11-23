import React from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import {useAuth0} from "@auth0/auth0-react";
import {PlusCircleIcon} from "@heroicons/react/outline";

import AuthWidget from "../components/auth-widget";
import ErrorScreen from "../components/error-screen";
import LoadingScreen from "../components/loading-screen";
import {URLS} from "../api";
import {Community} from "../models";

/**
 * Page containing the terms and conditions of the application.
 */
export default function TermsAndConditions() {
  return <div className="flex flex-col gap-3 p-8">
      <h1>Datenschutzerklärung von www.hartadiasporei.org</h1>

        <p>Wir freuen uns über Ihren Besuch auf unserer Webseite www.hartadiasporei.org und Ihr Interesse an unserem Unternehmen und unseren Angeboten. Für externe Links zu fremden Inhalten übernehmen wir trotz sorgfältiger inhaltlicher Kontrolle keine Haftung, da wir die Übermittlung dieser Information nicht veranlasst, den Adressaten der übermittelten Information und die übermittelten Informationen selbst nicht ausgewählt oder verändert haben.</p>
        <p>Der Schutz Ihrer personenbezogenen Daten bei der Erhebung, Verarbeitung und Nutzung anlässlich Ihres Besuchs auf unseren Internetseiten ist uns ein wichtiges Anliegen und erfolgt im Rahmen der gesetzlichen Vorschriften, über die Sie sich z.B. unter www.bfdi.bund.de informieren können.</p>
        <p>Im Folgenden erläutern wir Ihnen, welche Informationen wir während Ihres Besuchs auf unseren Webseiten erfassen und wie diese genutzt werden:</p>

        <h2>1. Erhebung und Speicherung personenbezogener Daten sowie Art und Zweck von deren Verwendung</h2>
        <h3>a) Beim Besuch der Webseite</h3>

        <p>Bei jedem Zugriff eines Kunden (oder sonstigen Besuchers) auf unserer Webseite werden durch den auf Ihrem Endgerät (Computer, Laptop, Tablet, Smartphone, etc.) zum Einsatz kommenden Internet-Browser automatisch Informationen an den Server unserer Webseite gesendet. Diese Informationen werden temporär in einem sog. Logfile (Protokolldatei) gespeichert.</p>

        <p>Folgende Daten werden dabei ohne Ihr Zutun erfasst und bis zur automatisierten Löschung gespeichert:</p>
        <ul className="flex flex-col pl-6 gap-2">
          <li>(pseudonymisierte) IP-Adresse des anfragenden Rechners, sowie Geräte-ID oder individuelle Geräte-Kennung und Gerätetyp,</li>
          <li>Name der abgerufenen Datei und übertragene Datenmenge, sowie Datum und Uhrzeit des Abrufs,</li>
          <li>Meldung über erfolgreichen Abruf,</li>
          <li>anfragende Domain,</li>
          <li>Beschreibung des Typs des verwendeten Internet-Browsers und ggf. des Betriebssystems Ihres Endgeräts sowie der Name Ihres Access-Providers,</li>
          <li>Ihre Browser-Verlaufsdaten sowie Ihre standardmäßigen Weblog-Informationen,</li>
        </ul>

        <p>Wir selbst erfassen keine Standortdaten. Wir weisen jedoch darauf hin, dass ein grober Standort immer aus der IP-Adresse ermittelt werden kann - allerdings wird kein Drittanbieter von uns damit beauftragt.</p>

        <p>Unser berechtigtes Interesse gem. Art. 6 Abs. 1 S. 1 lit. f DSGVO zur Erhebung der Daten beruht auf den folgenden Zwecken:</p>
        <ul className="flex flex-col pl-6 gap-2">
          <li>Gewährleistung eines reibungslosen Verbindungsaufbaus und einer komfortablen Nutzung der Webseite,</li>
          <li>Auswertung der Systemsicherheit und -stabilität sowie</li>
          <li>zu weiteren administrativen Zwecken.</li>
        </ul>
        <p>In keinem Fall verwenden wir die erhobenen Daten zu dem Zweck, Rückschlüsse auf Ihre Person zu ziehen.</p>
        <p>Die oben genannten Daten werden nach Verlassen der Website gelöscht.</p>

            <h3>b) Bei Anmeldung über ein Single-Sign-On Verfahren</h3>
            <p>Sie können sich bei uns mittels Ihres Social Media Accounts im Wege des Single-Sign-On Verfahrens registrieren, anstatt Ihre Daten zur Registrierung bzw. Bestellung manuell einzugeben.</p>
            <p>Wir haben folgenden Plugins zur Anmeldung integriert:</p>
            <h4>aa) Google</h4>
            <p>Wenn Sie sich mittels „Google“ der Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA anmelden, erhalten wir abhängig von den bei Google von Ihnen vorgenommenen Datenschutzeinstellungen, die in ihrem Profil hinterlegten allgemeinen und öffentlichen zugänglichen Informationen. Hierbei handelt es sich um die Nutzer-ID, den Namen und Ihre Emailadresse. </p>
            <p>Die Verarbeitung diese Daten beruht auf der nach Art. 6 Abs. 1 lit. a DSGVO erteilten Einwilligung.</p>
            <p>Der Empfänger der erhobenen Daten ist GOOGLE. Soweit eine Übermittlung Deiner Daten in die USA erfolgt, geschieht dies auf Grundlage Ihrer Einwilligung gemäß Art. 49 Abs. 1 S.1 lit. a DSGVO. Zudem hat sich GOOGLE im Rahmen einer Standardvertragsklausel gegenüber uns verpflichtet, dass in Drittländern außerhalb der EU, in die Daten exportiert werden, ein Datenschutzniveau gewährleistet wird, das dem der EU entspricht.</p>
            <p>Die Datenschutzerklärung finden Sie hier:  https://policies.google.com/privacy. </p>

            <h4>bb) Facebook Connect</h4>
            <p>Wenn Sie sich mittels „Facebook Connect“ der Facebook Inc., 1 Hacker Way, Menlo Park, California 94025, USA registrieren, erhalten wir abhängig von den bei FACEBOOK von Ihnen vorgenommenen Datenschutzeinstellungen, die in ihrem Profil hinterlegten allgemeinen und öffentlichen zugänglichen Informationen. Hierbei handelt es sich um die Nutzer-ID, den Namen, das Profilbild, das Alter und das Geschlecht. </p>
            <p>Abhängig von den von Ihnen getroffenen Datenschutzeinstellungen kann es zu einer Übertragung Ihrer Profilbilder, der Nutzer-IDs Ihrer Freunde und der Freundesliste kommen. Dies ist dann der Fall wenn die Privatsphäreneinstellungen auf „öffentlich“ gesetzt sind. </p>
            <p>Die Verarbeitung diese Daten beruht auf der nach Art. 6 Abs. 1 lit. a DSGVO erteilten Einwilligung.</p>
            <p>Der Empfänger der erhobenen Daten ist FACEBOOK. Soweit eine Übermittlung Deiner Daten in die USA erfolgt, geschieht dies auf Grundlage Ihrer Einwilligung gemäß Art. 49 Abs. 1 S.1 lit. a DSGVO. Zudem hat sich FACEBOOK im Rahmen einer Standardvertragsklausel gegenüber uns verpflichtet, dass in Drittländern außerhalb der EU, in die Daten exportiert werden, ein Datenschutzniveau gewährleistet wird, das dem der EU entspricht.</p>
            <p>Die Datenschutzerklärung: finden von FACEBOOK ist hier abrufbar: https://www.facebook.com/about/privacy/. Hier können Sie die erteilte Einwilligung zur Verarbeitung Ihrer Daten widderrufen: Opt-Out: https://www.facebook.com/settings?tab=ads und http://www.youronlinechoices.com.</p>

            <h3>c) Daten auf den Karten</h3>
            <p>Die Verarbeitung der personenbezogenen Daten, welche auf den Karten erscheinen, beruht auf unserem berechtigtem Interesse im Sinne des Art. 6 Abs. 1 lit. f DSGVO, Nutzern Informationen über rumänische bzw. rumänisch sprachige Dienstleister, Vereine und/oder Einrichtungen zur Verfügung zu stellen.</p>

            <h2>2. Weitergabe von personenbezogenen Daten</h2>
            <p>Eine Übermittlung Ihrer Daten an Dritte zu anderen als den im Folgenden aufgeführten Zwecken findet nicht statt.</p>
            <p>Wir geben Ihre Daten nur an Dritte weiter, wenn:</p>
            <ul className="flex flex-col pl-6 gap-2">
              <li>Sie eine ausdrückliche Einwilligung dazu erteilt haben nach (Art. 6 Abs. 1 S. 1 lit. a DSGVO),</li>
              <li>dies für die Abwicklung von Vertragsverhältnissen mit Ihnen erforderlich ist (Art. 6 S. 1 Abs. 1 lit. b DSGVO), </li>
              <li>eine gesetzliche Verpflichtung zur Weitergabe besteht (Art. 6 Abs. 1 S. 1 lit. c DSGVO),</li>
              <li>die Weitergabe zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist und kein Grund zur Annahme besteht, dass Sie ein überwiegendes schutzwürdiges Interesse an der Nichtweitergabe Ihrer Daten haben (Art. 6 Abs. 1 S. 1 lit. f DSGVO).</li>
            </ul>
            <p>In diesen Fällen beschränkt sich der Umfang der übermittelten Daten jedoch nur auf das erforderliche Minimum.</p>
            <p>Unsere Datenschutzbestimmungen stehen im Einklang mit den geltenden datenschutzrechtlichen Bestimmungen und die Daten werden nur in der Bundesrepublik Deutschland verarbeitet. Wir arbeiten aber auch mit Drittanbietern zusammen, die die Daten außerhalb der EU verarbeiten können. Alle Drittanbieter, mit denen wir zusammenarbeiten, sind in unserer Datenschutzerklärung aufgeführt. </p>

            <h2>3. Betroffenenrechte</h2>
            <p>Auf Anfrage werden wir Sie gern informieren, ob und welche personenbezogenen Daten zu Ihrer Person gespeichert sind (Art. 15 DSGVO), insbesondere über die Verarbeitungszwecke, die Kategorie der personenbezogenen Daten, die Kategorien von Empfängern, gegenüber denen Ihre Daten offengelegt wurden oder werden, die geplante Speicherdauer, das Bestehen eines Rechts auf Berichtigung, Löschung, Einschränkung der Verarbeitung oder Widerspruch, das Bestehen eines Beschwerderechts, die Herkunft ihrer Daten, sofern diese nicht bei uns erhoben wurden, sowie über das Bestehen einer automatisierten Entscheidungsfindung einschließlich Profiling.</p>
            <p>Ihnen steht zudem das Recht zu, etwaig unrichtig erhobene personenbezogene Daten berichtigen oder unvollständig erhobene Daten vervollständigen zu lassen (Art. 16 DSGVO). </p>
            <p>Ferner haben Sie das Recht, von uns die Einschränkung der Verarbeitung Ihrer Daten zu verlangen, sofern die gesetzlichen Voraussetzungen hierfür vorliegen (Art. 18 DSGVO).</p>
            <p>Sie haben das Recht, die Sie betreffenden personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten oder die Übermittlung an einen anderen Verantwortlichen zu verlangen (Art. 20 DSGVO). </p>
            <p>Darüber hinaus steht Ihnen das sogenannte „Recht auf Vergessenwerden“ zu, d.h. Sie können von uns die Löschung Ihrer personenbezogenen Daten verlangen, sofern hierfür die gesetzlichen Voraussetzungen vorliegen (Art. 17 DSGVO). </p>
            <p>Unabhängig davon werden Ihre personenbezogenen Daten automatisch von uns gelöscht, wenn der Zweck der Datenerhebung weggefallen oder die Datenverarbeitung unrechtmäßig erfolgt ist.</p>
            <p>Gemäß Art. 7 Abs. 3 DSGVO haben Sie das Recht Ihre einmal erteilte Einwilligung jederzeit gegenüber uns zu widerrufen. Dies hat zur Folge, dass wir die Datenverarbeitung, die auf dieser Einwilligung beruhte, für die Zukunft nicht mehr fortführen dürfen.</p>
            <p>Sie haben zudem das Recht, jederzeit gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch zu erheben, sofern ein Widerspruchsrecht gesetzlich vorgesehen ist. Im Falle eines wirksamen Widerrufs werden Ihre personenbezogenen Daten ebenfalls automatisch durch uns gelöscht (Art. 21 DSGVO).</p>
            <p>Möchten Sie von Ihrem Widerrufs- oder Widerspruchsrecht Gebrauch machen, genügt eine E-Mail an: harta@diasporacivica.berlin </p>
            <p>Bei Verstößen gegen die datenschutzrechtlichen Vorschriften haben Sie gem. Art. 77 DSGVO die Möglichkeit, Beschwerde bei der zuständigen Aufsichtsbehörde zu erheben. Zuständige Aufsichtsbehörde ist sowohl die Landesbeauftragte für Berlin https://www.datenschutz-berlin.de/) als auch jede andere Aufsichtsbehörde.</p>

            <h2>4. Dauer der Datenspeicherung</h2>

            <p>Die erhobenen Daten werden solange bei uns gespeichert, wie dies für die Durchführung der mit uns eingegangen Nutzungsverhältnis erforderlich ist oder Sie Ihr Recht auf Löschung oder Ihr Recht auf Datenübertragung auf ein anderes Unternehmen nicht ausgeübt haben.</p>

            <h2>5. Cookies</h2>

            <p>Wir setzen auf unserer Webseite Cookies ein. Hierbei handelt es sich um kleine Text-Dateien, die Ihr Browser automatisch erstellt und die auf Ihrem Endgerät gespeichert werden, wenn Sie unsere Webseite besuchen. In dem Cookie werden Informationen abgelegt, die sich jeweils im Zusammenhang mit dem spezifisch eingesetzten Endgerät ergeben. Dies bedeutet jedoch nicht, dass wir unmittelbar Kenntnis von Ihrer Identität erhalten.</p>
            <p>Diese Cookies sind werden als sog. First-Party-Cookies (“eigene Cookies”) oder Third-Party-Cookies (“Drittanbietercookies”) gesetzt. First-Party-Cookies werden durch die Webseite gesetzt, auf der Sie sich gerade befinden und werden von Browsern nicht domainübergreifend zugänglich gemacht. Ein Third-Party-Cookie hingegen wird durch einen Dritten gesetzt, also nicht durch die eigentliche Webseite, auf der Sie sich gerade befinden.</p>
            <p>Die Cookies werden darüber hinaus in technisch notwendige und technisch nicht notwendige Cookies unterschieden. Auf unserer Webseite werden sowohl technisch notwendige Cookies als auch technisch nicht notwendige Cookies nach Maßgabe der folgenden Absätze gesetzt.</p>

            <h3>a) Technisch notwendige Cookies</h3>
            <p>Technisch notwendige Cookies sind für den Betrieb unserer Webseite zwingend erforderlich und führen z.B. dazu, dass Ihnen bestimmte Funktionen überhaupt erst ermöglicht werden. Diese technisch notwendigen Cookies, die nur für die einzelne notwendige Online-Sitzung benötigt und gesetzt werden, werden nach Verlassen unserer Webseite automatisch gelöscht. </p>
            <p>Rechtsgrundlage für den Einsatz dieser technisch notwendigen Cookies ist Art. 6 Abs. 1 S. 1 lit. f DSGVO.</p>

            <h3>b) Technisch nicht notwendige Cookies</h3>
            <p>Soweit Sie die entsprechende Einwilligung erklärt haben, setzen wir auf unserer Seite sog. technisch nicht notwendige Cookies ein. Die technisch nicht notwendigen Cookies dienen hauptsächlich dazu, die Nutzung der Webseite sowie Nutzerverhalten auszuwerten, Berichte über die Aktivitäten der Besucher auf der Website zusammenzustellen und um weitere mit der Nutzung der Webseite verbundene Dienstleistungen zu erbringen.</p>
            <p>Die von uns verwendeten technisch nicht notwendigen Cookies werden in unserem Cookie-Banner hinsichtlich der Funktionsweise, der Dauer sowie möglicher Drittempfänger der Daten erläutert. Sofern bestimmte, von uns eingesetzte Drittanbieter im Rahmen der für uns erbrachten Dienstleistung Cookies setzen, wird in unserer Datenschutzerklärung hierauf zusätzlich gesondert hingewiesen. </p>
            <p>Rechtsgrundlage für den Einsatz der technisch nicht notwendigen Cookies ist Art. 6 Abs. 1 S. 1 lit. a DSGVO, sofern Sie Ihre Einwilligung erteilt haben.</p>
            <p>Ihre Einwilligung können Sie jederzeit widerrufen. Ferner haben Sie jederzeit die Möglichkeit, das Setzen von Cookies zu konfigurieren. Sie können z.B. Ihren Browser so einstellen, dass er Sie über das Setzen von Cookies vorher informiert oder Cookies vollständig verweigert.</p>

            <h2>6. Cloudflare</h2>

            <p>Zum Schutz unserer Website nutzen wir den Dienst Cloudflare des Anbieters Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA. Cloudflare betreibt ein Content Delivery Network (CDN) und stellt Schutzfunktionen für die Website (Web Application Firewall) zur Verfügung. Zu diesem Zweck wird der Datentransfer zwischen dem anfragenden Browser und unseren Server durch Cloudflare entschlüsselt, um Angriff wie beispielsweise sogenannte Distributed-Denial-of-Service (DDoS) Angriffe auf unsere Software zu vermeiden. </p>
            <p>Rechtsgrundlage ist die Wahrung berechtigter Interessen, nämlich die Verhinderung von Angriffen auf unsere Website gem. Art. 6 Abs. 1 S. 1 lit. f. DSGVO.</p>
            <p>Weitere Informationen zu den Datenschutzbestimmungen von Cloudflare finden Sie hier: https://www.cloudflare.com/privacypolicy. </p>

            <h2>7. DigitalOcean</h2>
            <p>Wir nutzen das Content Delivery Network (CDN) DigitalOcean auf dieser Website. Dies ist ein Dienst von DigitalOcean LLC, 106, 6th Avenue, New York, Vereinigte Staaten. Mit Hilfe des CDN wird der Inhalt unserer Website über mehrere angeschlossene Server schneller ausgeliefert. Ihr Browser muss zu diesem Zweck Kontakt mit den Servern von Digital Ocean Kontakt aufnehmen. Dabei wird Ihre IP-Adresse verarbeitet. Dies geschieht auf der Grundlage Ihrer Einwilligung gemäß Art. 6 Abs.. 1 Satz 1 lit. a DSGVO</p>
            <p>Sofern Ihre Daten in die USA übermittelt werden, geschieht dies auf der Grundlage Ihrer Einwilligung gemäß Art. 49 Abs. 1 Satz 1 lit. a DSGVO. Darüber hinaus haben sich die betreffenden Dienstleister im Rahmen einer Standardvertragsklausel gegenüber uns verpflichtet, dass in Drittstaaten außerhalb der EU, in die Daten exportiert werden, ein dem EU-Niveau gleichwertiges Datenschutzniveau gewährleistet ist.</p>

            <p>Weitere Informationen über die Verarbeitung Ihrer Daten finden Sie hier: https://www.digitalocean.com/legal/privacy-policy. </p>

            <h2>8. Datensicherheit</h2>

            <p>Wir sind um alle notwendigen technischen und organisatorischen Sicherheitsmaßnahmen bemüht, um Ihre personenbezogenen Daten so zu speichern, dass sie weder Dritten noch der Öffentlichkeit zugänglich sind. Sollten Sie mit uns per E-Mail in Kontakt treten wollen, so weisen wir Sie darauf hin, dass bei diesem Kommunikationsweg die Vertraulichkeit der übermittelten Informationen nicht vollständig gewährleistet werden kann. Wir empfehlen Ihnen daher, uns vertrauliche Informationen ausschließlich über den Postweg zukommen zu lassen.</p>

            <h2>9. Aktualität und Änderung dieser Datenschutzerklärung</h2>

            <p>Diese Datenschutzerklärung ist aktuell gültig und hat den Stand 14.11.2022. </p>
            <p>Durch die Weiterentwicklung unserer Webseite und Angebote darüber oder aufgrund geänderter gesetzlicher beziehungsweise behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern. </p>

            <h2>10. Name und Kontaktdaten des für die Verarbeitung Verantwortlichen </h2>

            <p>Diese Datenschutz-Information gilt für die Datenverarbeitung durch </p>
            <p> 
              DCB - Rumänische Diaspora Initiative e.V., 
              <br/>
              ℅ Bunescu
              <br/>
              Oderstraße 16, 
              <br/>
              10247 Berlin 
              <br/>
              („Verantwortlicher“).
              <br/>
            </p> 
  </div>
}
