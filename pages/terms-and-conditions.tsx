import React from "react";
import {NextPageWithLayout} from "./_app";
import FrontLayout from "../components/layout/frontLayout";

const TermsAndConditions: NextPageWithLayout = () =>
  <div className="flex flex-col gap-3 p-8">
    <h1>Allgemeine Nutzungsbedingungen von www.hartadiasporei.org</h1>
    <h2>§ 1 Allgemeines</h2>
    <ol className="flex flex-col pl-6 gap-2">
      <li><p>Diese Allgemeinen Nutzungsbedingungen gelten für alle rechtlichen Beziehungen der DCB - Rumänische Diaspora
        Initiative e.V., Oderstraße 16, 10247 Berlin, (im Folgenden „DCB”), gegenüber Nutzern der Website www.
        www.hartadiasporei.org und allen Unterseiten (im Folgenden: „Webseite“). Für eine bessere Lesbarkeit bezeichnet
        “Nutzer” sowohl männliche, weibliche und diverse Personengruppen als auch Unternehmen.</p></li>
      <li><p>Abweichende Vorschriften der Nutzer gelten nicht, es sei denn, DCB hat dies schriftlich bestätigt.
        Individuelle Abreden zwischen DCB und den Nutzern haben dabei stets Vorrang.</p></li>
      <li><p>Die Geschäftsbeziehungen zwischen DCB und den Nutzern unterliegen dem Recht der Bundesrepublik Deutschland.
        Bei Verbrauchern gilt diese Rechtswahl nur insoweit, als nicht der gewährte Schutz durch zwingende Bestimmungen
        des Rechts des Staates, in dem der Verbraucher seinen gewöhnlichen Aufenthalt hat, entzogen wird.</p></li>
      <li><p>Der Nutzer kann diese Allgemeinen Nutzungsbedingungen abrufen, speichern und ausdrucken. Bei einer
        Registrierung wird der Vertragstext von DCB nach dem Vertragsschluss nicht für die Nutzer zugänglich
        gespeichert. Die Vertragssprache ist Deutsch.</p></li>
      <li><p>Gerichtsstand ist Berlin, soweit der Nutzer Kaufmann oder eine juristische Person des öffentlichen Rechts
        oder öffentlich-rechtliches Sondervermögen ist. Dasselbe gilt, wenn ein Nutzer keinen allgemeinen Gerichtsstand
        in Deutschland hat oder der Wohnsitz oder gewöhnliche Aufenthalt zum Zeitpunkt der Klageerhebung nicht bekannt
        ist.</p></li>
      <li><p>Informationspflicht gem. Verbraucherstreitbeilegungsgesetz (§ 36 VSBG): DCB ist zur Teilnahme an weiteren
        Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle weder bereit noch verpflichtet.</p></li>
    </ol>
    <h2>§ 2 Leistungen von DCB</h2>
    <ol className="flex flex-col pl-6 gap-2">
      <li>DCB bietet den Nutzern auf der Webseite eine Karte mit Einträgen von rumänischen bzw. rumänisch sprachigen
        Dienstleistern, Vereinen und Einrichtungen an.
      </li>
      <li>Angemeldete Nutzer können zudem Einträge in die Karte vornehmen, indem sie unter hartadiasporei.org rumänische
        bzw. rumänisch sprachige Dienstleister, Vereine und/oder Einrichtungen angeben können.
      </li>
      <li>DCB überprüft die von den Nutzern angegebenen Informationen hinsichtlich neu aufzunehmender rumänischer bzw.
        rumänisch sprachiger Dienstleister, Vereine und/oder Einrichtungen nur auf Plausibilität. Sie überprüft die in
        von den Nutzern gemachten Angaben nicht auf ihre Richtigkeit. Sollte DCB allerdings Kenntnis davon erlangen,
        dass ein Nutzer unrichtige Angaben gemacht, werden diese korrigiert oder gelöscht.
      </li>
    </ol>
    <h2>§ 3 Voraussetzungen für die Nutzung der Website</h2>
    <p>Zur Nutzung der Webseite ist jede natürliche oder juristische Person unter den hierin beschriebenen
      Voraussetzungen berechtigt. </p>
    <h2>§ 4 Anmeldung</h2>
    <ol className="flex flex-col pl-6 gap-2">
      <li>Der Besuch der Webseite ist kostenlos und ohne Registrierung möglich.</li>
      <li>Damit die Nutzer Einträge in die Karte vornehmen können, müssen sich die Nutzer im Wege eines Single-Sign-on
        Verfahrens mit ihrem Google- oder Facebook Connect Account anmelden. Die Anmeldung ist kostenfrei.
      </li>
    </ol>
    <h2>§ 5 Verfügbarkeit</h2>
    <ol className="flex flex-col pl-6 gap-2">
      <li>DCB gewährleistet nicht die ständige und umfassende Verfügbarkeit der Webseite, da diese z.B. durch Störung
        der öffentlichen Kommunikationsnetze, der Stromversorgung oder sonstiges nicht im Einflussbereich von DCB
        liegenden Umständen beeinträchtigt werden kann.
      </li>
      <li>DCB behält sich darüber hinaus die zeitweilige Beschränkung des Zugangs zur Webseite durch Wartungsarbeiten
        oder Weiterentwicklung sowie die teilweise oder dauerhafte Abschaltung der auf der Webseite veröffentlichten
        Karten vor.
      </li>
    </ol>
    <h2>§ 6 Verhaltenspflichten des Nutzers, Freistellung von Verstößen</h2>
    <ol className="flex flex-col pl-6 gap-2">
      <li>Der Nutzer sichert zu, dass seine Angaben der Wahrheit entsprechen.</li>
      <li>
        Der Nutzer darf die Webseite nicht nutzen, um
        <ul className="pl-6">
          <li>Aktivitäten durchzuführen, die direkt oder indirekt gesetzwidrig, schädlich, sittenwidrig, drohend,
            bedrängend, unaufrichtig sind,
          </li>
          <li>die Privatsphäre anderer angreifend, abscheulich oder rassistisch, sexuell ethisch oder anderweitig
            verletzend sind,
          </li>
          <li>Aktivitäten durchzuführen, die die Rechte Dritter verletzen oder verletzen können,</li>
          <li>evtl. Inhalte an Dritte zu übermitteln, an denen der Nutzer keine Rechte hat,</li>
          <li>in das System unsachliche, irrelevante, irreführende und vorsätzlich unwahre und falsche Informationen
            einzugeben,
          </li>
          <li>Aktivitäten vorsätzlich durchzuführen, die bewusst zu Systemstörungen führen.</li>
        </ul>
      </li>
      <li>Nutzer dürfen keine Mechanismen, Software oder sonstige Scripts in Verbindung mit der Nutzung der Webseite
        verwenden, die das Funktionieren der Webseite stören können, insbesondere solche, die es ermöglichen,
        automatisierte Seitenaufrufe zu generieren.
      </li>
      <li>Nutzer dürfen keine Maßnahmen ergreifen, die eine unzumutbare oder übermäßige Belastung der Infrastruktur zur
        Folge haben können.
      </li>
      <li>Nutzer dürfen keine von DCB generierten Inhalte blockieren, überschreiben oder modifizieren oder in sonstiger
        Weise störend in die Internetseite eingreifen.
      </li>
      <li>Jeder Nutzer ist verpflichtet, außer ihn trifft kein Verschulden, auf seine Kosten DCB von der Haftung
        freizustellen, schadlos zu halten und zu verteidigen gegenüber allen Forderungen, Klagen oder Prozessen Dritter
        gegen DCB oder seine gesetzlichen Vertreter oder Erfüllungsgehilfen, sowie gegenüber allen zugehörigen
        Verpflichtungen, Schäden, Vergleichen, Strafen, Bußgeldern, Kosten oder Ausgaben (darunter unter anderem
        Anwalts- und andere Verhandlungskosten in zumutbarer Höhe), die DCB oder seinen gesetzlichen Vertretern oder
        Erfüllungsgehilfen entstehen aufgrund oder im Zusammenhang mit einem Verstoß des Nutzers gegen diese
        Nutzungsbedingungen oder gegen geltende Gesetze, Vorschriften oder Auflagen in Zusammenhang mit der Nutzung der
        Webseite. In einem solchen Fall informiert DCB den Nutzer schriftlich über derartige Forderungen, Klagen oder
        Prozesse. Der Nutzer hat sich soweit wie möglich an der Verteidigung gegenüber sämtlichen Forderungen zu
        beteiligen.
      </li>
    </ol>
    <h2>§ 7 Haftung von DCB</h2>
    <ol className="flex flex-col pl-6 gap-2">
      <li>DCB haftet bei Sach- und Rechtmängeln nur, wenn es diese arglistig verschwiegen hat. Darüber hinaus haftet DCB
        nur unbeschränkt, soweit die Schadensursache auf Vorsatz oder grober Fahrlässigkeit beruht.
      </li>
      <li>Die Haftungsbeschränkungen des vorstehenden Absatzes gelten nicht bei Verletzung von Leben, Körper und
        Gesundheit.
      </li>
      <li>Ist die Haftung von DCB ausgeschlossen oder beschränkt, so gilt dies ebenfalls für die persönliche Haftung
        seiner Angestellten, Vertreter und Erfüllungsgehilfen.
      </li>
    </ol>
    <h2>§ 8 Sperrung </h2>
    <ol className="flex flex-col pl-6 gap-2">
      <li>DCB kann folgende Maßnahmen ergreifen, wenn konkrete Anhaltspunkte dafür bestehen, dass ein Nutzer gesetzliche
        Vorschriften, Rechte Dritter oder diese Nutzungsbedingungen verletzt, oder wenn DCB ein sonstiges berechtigtes
        Interesse hat, insbesondere zum Schutz der anderen Nutzer:
        <ul>
          <li>Verwarnung (Abmahnung) von Nutzern,</li>
          <li>Vorläufige, teilweise oder endgültige Sperrung des Nutzers</li>
          <li>Außerordentliche Kündigung der geschlossenen Nutzungsverträge</li>
        </ul>
      </li>
      <li>Sobald ein Nutzer vorläufig oder endgültig gesperrt wurde, darf er sich auf der Webseite auch mit anderen
        Nutzerzugängen nicht erneut anmelden.
      </li>
    </ol>
    <h2>§ 9 Datenschutz</h2>
    <p>Die Erhebung, Verarbeitung und Nutzung der personenbezogenen Daten der Nutzer durch DCB erfolgt unter Beachtung
      der geltenden Datenschutzvorschriften sowie gemäß unserer Datenschutzerklärung.</p>
    <div>
      <p>Stand: 14.11.2022</p>
    </div>
  </div>

TermsAndConditions.getLayout = (page) => <FrontLayout>{page}</FrontLayout>

export default TermsAndConditions;
