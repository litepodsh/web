// Copy for the legal pages. Shared by the .astro pages and their Markdown
// representations, so both stay in sync.
//
// A block is either `{ p }` (a paragraph) or `{ h2, p?, list? }` (a section).
// Paragraphs and list items are a string, or an array of strings and
// `{ href, text }` links.

export const legal = {
  privacy: {
    en: {
      title: "Privacy Notice",
      description: "How Litepod Studio handles personal information.",
      updated: "November 4, 2026",
      updatedIso: "2026-11-04",
      blocks: [
        {
          p: "Litepod Studio respects your privacy. This notice explains how we handle personal information when you visit Litepod or use Litepod Cloud.",
        },
        {
          h2: "Information we collect",
          list: [
            "Information you provide when you contact us, create an account, or request support.",
            "Technical and usage information, such as device, browser, pages visited, and interactions with the website.",
            "Security information about your Litepod Cloud account: sign-ins, failed sign-in attempts and account security changes, with the IP address, browser, time, and an approximate location (country, city and network provider) derived from the IP address.",
            "Operational information about Litepod Cloud: account creation, sign-outs, deployments and remote server connections, with the account, IP address, browser and time.",
            "Payment and purchase information handled by Polar for paid Litepod Cloud services.",
          ],
        },
        {
          h2: "How we use it",
          p: "We use this information to provide and secure Litepod, process purchases, support users, understand website performance, and meet legal obligations. We use sign-in security information only to detect unusual access and protect accounts, for example a sign-in from a new country or from places too far apart in too little time. We use operational information to know which users are active so we can plan server restarts and updates, provide support and protect the service. When our team works inside your organization to support you, those actions are kept in these logs rather than in your organization's audit log. Only the Litepod administration team can see this security and operational information, and we never use it for advertising. We recommend turning on two-factor authentication (2FA): it protects your account even if someone gets your password. We do not sell personal information.",
        },
        {
          h2: "Analytics and local storage",
          p: "This website uses Umami analytics and session recording to understand how visitors use the site. Your browser also stores your selected light or dark theme locally. You can limit analytics through your browser settings or privacy tools.",
        },
        {
          h2: "Sharing and retention",
          p: "We share information only with service providers that help us operate Litepod, including Polar for payments, Umami for analytics, and ip.guide (with ipwho.is as a fallback), which receives only the IP address of a sign-in to look up its approximate location, or when required by law. We retain information only as long as needed for these purposes, including legal and accounting requirements. Litepod Cloud security and operational logs are deleted after 90 days; we keep them longer, up to one year, only when needed to investigate an incident or meet a legal obligation.",
        },
        {
          h2: "Your choices",
          p: [
            "You may request access, correction, deletion, or other privacy assistance by emailing ",
            { href: "mailto:info@litepod.sh", text: "info@litepod.sh" },
            ". We may need to verify your request and may retain information where the law permits or requires it.",
          ],
        },
        {
          h2: "Contact",
          p: [
            "For privacy questions, contact Litepod Studio at ",
            { href: "mailto:info@litepod.sh", text: "info@litepod.sh" },
            ".",
          ],
        },
      ],
    },
    es: {
      title: "Aviso de privacidad",
      description: "Cómo trata Litepod Studio la información personal.",
      updated: "4 de noviembre de 2026",
      updatedIso: "2026-11-04",
      blocks: [
        {
          p: "Litepod Studio respeta tu privacidad. Este aviso explica cómo tratamos la información personal cuando visitas Litepod o usas Litepod Cloud.",
        },
        {
          h2: "Información que recopilamos",
          list: [
            "La información que nos das cuando nos contactas, creas una cuenta o pides soporte.",
            "Información técnica y de uso, como el dispositivo, el navegador, las páginas visitadas y las interacciones con el sitio web.",
            "Información de seguridad de tu cuenta de Litepod Cloud: inicios de sesión, intentos fallidos de inicio de sesión y cambios de seguridad de la cuenta, con la dirección IP, el navegador, la fecha y una ubicación aproximada (país, ciudad y proveedor de red) obtenida a partir de la dirección IP.",
            "Información operativa de Litepod Cloud: creación de cuentas, cierres de sesión, despliegues y conexiones a servidores remotos, con la cuenta, la dirección IP, el navegador y la fecha.",
            "Información de pagos y compras, gestionada por Polar para los servicios de pago de Litepod Cloud.",
          ],
        },
        {
          h2: "Cómo la usamos",
          p: "Usamos esta información para ofrecer y proteger Litepod, procesar compras, dar soporte a los usuarios, entender el rendimiento del sitio web y cumplir con nuestras obligaciones legales. Usamos la información de seguridad de los inicios de sesión solo para detectar accesos inusuales y proteger las cuentas, por ejemplo un inicio de sesión desde un país nuevo o desde lugares demasiado lejanos en poco tiempo. Usamos la información operativa para saber qué usuarios están activos, planificar los reinicios y las actualizaciones de los servidores, dar soporte y proteger el servicio. Cuando nuestro equipo trabaja dentro de tu organización para darte soporte, esas acciones quedan en estos registros y no en el registro de auditoría de tu organización. Solo el equipo de administración de Litepod puede ver esta información de seguridad y operativa, y nunca la usamos para publicidad. Te recomendamos activar la autenticación de dos factores (2FA): protege tu cuenta aunque alguien consiga tu contraseña. No vendemos información personal.",
        },
        {
          h2: "Análisis y almacenamiento local",
          p: "Este sitio web usa los análisis y la grabación de sesiones de Umami para entender cómo lo usan los visitantes. Tu navegador también guarda localmente el tema claro u oscuro y el idioma que elijas. Puedes limitar los análisis desde la configuración de tu navegador o con herramientas de privacidad.",
        },
        {
          h2: "Compartición y conservación",
          p: "Compartimos información solo con los proveedores que nos ayudan a operar Litepod, como Polar para los pagos, Umami para los análisis e ip.guide (con ipwho.is como respaldo), que recibe solo la dirección IP de un inicio de sesión para obtener su ubicación aproximada, o cuando la ley lo exige. Conservamos la información solo el tiempo necesario para estos fines, incluidos los requisitos legales y contables. Los registros de seguridad y operativos de Litepod Cloud se eliminan a los 90 días; solo los conservamos más tiempo, hasta un año, cuando hace falta para investigar un incidente o cumplir una obligación legal.",
        },
        {
          h2: "Tus opciones",
          p: [
            "Puedes pedir acceso, corrección, eliminación u otra ayuda sobre privacidad escribiendo a ",
            { href: "mailto:info@litepod.sh", text: "info@litepod.sh" },
            ". Puede que tengamos que verificar tu solicitud y que conservemos información cuando la ley lo permita o lo exija.",
          ],
        },
        {
          h2: "Contacto",
          p: [
            "Para preguntas sobre privacidad, contacta a Litepod Studio en ",
            { href: "mailto:info@litepod.sh", text: "info@litepod.sh" },
            ".",
          ],
        },
      ],
    },
  },
  terms: {
    en: {
      title: "Terms of Service",
      description: "Terms for using Litepod and Litepod Cloud.",
      updated: "October 31, 2026",
      updatedIso: "2026-10-31",
      blocks: [
        {
          p: 'These Terms of Service govern your use of the Litepod website, software, and Litepod Cloud services provided by Litepod Studio ("Litepod", "we", "us"). By using them, you agree to these terms.',
        },
        {
          h2: "Use of Litepod",
          p: [
            "You may use Litepod only in compliance with applicable law and these terms. You are responsible for your servers, applications, data, credentials, and the people you authorize to use your account. We log sign-in activity on Litepod Cloud accounts to detect unusual access, as described in our ",
            { href: "/privacy", text: "Privacy Notice" },
            ", and may temporarily disable an account that shows signs of unauthorized access while we review it with its owner. We recommend turning on two-factor authentication (2FA) to avoid problems.",
          ],
        },
        {
          h2: "Paid services and billing",
          p: [
            "Paid Litepod Cloud services are processed by Polar. Prices, billing periods, taxes, and renewal terms shown at checkout form part of your purchase. Our ",
            { href: "/refunds", text: "Refund Policy" },
            " explains how to request a refund.",
          ],
        },
        {
          h2: "Availability",
          p: 'We work to keep the services available and secure, but they are provided on an "as is" and "as available" basis to the maximum extent permitted by law. Do not rely on Litepod as your only backup or security measure.',
        },
        {
          h2: "Suspension or termination",
          p: "We may suspend or end access where necessary to protect the service, comply with law, or address a breach of these terms. You may stop using the services at any time.",
        },
        {
          h2: "Changes and contact",
          p: [
            "We may update these terms by posting the revised version here. For questions, contact ",
            { href: "mailto:info@litepod.sh", text: "info@litepod.sh" },
            ".",
          ],
        },
      ],
    },
    es: {
      title: "Términos de servicio",
      description: "Términos para usar Litepod y Litepod Cloud.",
      updated: "31 de octubre de 2026",
      updatedIso: "2026-10-31",
      blocks: [
        {
          p: 'Estos Términos de servicio rigen tu uso del sitio web, el software y los servicios de Litepod Cloud que ofrece Litepod Studio ("Litepod", "nosotros"). Al usarlos, aceptas estos términos.',
        },
        {
          h2: "Uso de Litepod",
          p: [
            "Solo puedes usar Litepod cumpliendo la ley aplicable y estos términos. Eres responsable de tus servidores, aplicaciones, datos y credenciales, y de las personas a las que autorizas a usar tu cuenta. Registramos la actividad de inicio de sesión de las cuentas de Litepod Cloud para detectar accesos inusuales, como se describe en nuestro ",
            { href: "/privacy", text: "Aviso de privacidad" },
            ", y podemos desactivar temporalmente una cuenta que muestre señales de acceso no autorizado mientras lo revisamos con su titular. Te recomendamos activar la autenticación de dos factores (2FA) para evitar problemas.",
          ],
        },
        {
          h2: "Servicios de pago y facturación",
          p: [
            "Polar procesa los pagos de los servicios de Litepod Cloud. Los precios, los períodos de facturación, los impuestos y las condiciones de renovación que se muestran al pagar forman parte de tu compra. Nuestra ",
            { href: "/refunds", text: "Política de reembolso" },
            " explica cómo solicitar un reembolso.",
          ],
        },
        {
          h2: "Disponibilidad",
          p: 'Trabajamos para que los servicios estén disponibles y sean seguros, pero se ofrecen "tal cual" y "según disponibilidad", en la máxima medida que permita la ley. No uses Litepod como tu única copia de seguridad ni como tu única medida de seguridad.',
        },
        {
          h2: "Suspensión o terminación",
          p: "Podemos suspender o cancelar el acceso cuando sea necesario para proteger el servicio, cumplir la ley o atender un incumplimiento de estos términos. Puedes dejar de usar los servicios en cualquier momento.",
        },
        {
          h2: "Cambios y contacto",
          p: [
            "Podemos actualizar estos términos publicando aquí la versión revisada. Para preguntas, escribe a ",
            { href: "mailto:info@litepod.sh", text: "info@litepod.sh" },
            ".",
          ],
        },
      ],
    },
  },
  refunds: {
    en: {
      title: "Refund Policy",
      description: "Litepod Cloud refund policy.",
      updated: "October 31, 2026",
      updatedIso: "2026-10-31",
      blocks: [
        {
          p: "This policy applies to paid Litepod Cloud services purchased directly through Polar.",
        },
        {
          h2: "30-day refunds",
          p: [
            "You may request a refund within 30 calendar days of your purchase. Please request it first through Polar. If you cannot do so, email ",
            { href: "mailto:info@litepod.sh", text: "info@litepod.sh" },
            " from the email address used for the order and include your Polar order reference.",
          ],
        },
        {
          h2: "Subscriptions",
          p: "You can cancel a subscription at any time. Cancellation prevents future renewals; access remains available through the end of the paid billing period unless we tell you otherwise.",
        },
        {
          h2: "Questions",
          p: "We will review refund requests promptly. This policy does not limit any refund rights that cannot be excluded under applicable law.",
        },
      ],
    },
    es: {
      title: "Política de reembolso",
      description: "Política de reembolso de Litepod Cloud.",
      updated: "31 de octubre de 2026",
      updatedIso: "2026-10-31",
      blocks: [
        {
          p: "Esta política aplica a los servicios de pago de Litepod Cloud comprados directamente a través de Polar.",
        },
        {
          h2: "Reembolsos en 30 días",
          p: [
            "Puedes solicitar un reembolso dentro de los 30 días naturales posteriores a tu compra. Solicítalo primero a través de Polar. Si no puedes hacerlo, escribe a ",
            { href: "mailto:info@litepod.sh", text: "info@litepod.sh" },
            " desde el correo que usaste para el pedido e incluye la referencia de tu pedido de Polar.",
          ],
        },
        {
          h2: "Suscripciones",
          p: "Puedes cancelar una suscripción en cualquier momento. La cancelación evita las renovaciones futuras; el acceso sigue disponible hasta el final del período de facturación pagado, salvo que te indiquemos otra cosa.",
        },
        {
          h2: "Preguntas",
          p: "Revisaremos las solicitudes de reembolso con rapidez. Esta política no limita los derechos de reembolso que no puedan excluirse según la ley aplicable.",
        },
      ],
    },
  },
};
