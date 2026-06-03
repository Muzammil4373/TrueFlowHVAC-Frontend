import Layout from "../components/layout/Layout";

export default function Disclaimer() {
  return (
    <Layout
      title="Website Disclaimer"
      description="Website Disclaimer for TruFlow HVAC."
      canonical="/disclaimer"
    >
      {/* Hero */}
      <section className="pt-40 pb-20 bg-gradient-to-br from-brand-950 via-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-orange-500/20 text-orange-400 text-sm font-semibold mb-6">
            Legal Information
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Website Disclaimer
          </h1>

          <p className="max-w-3xl mx-auto text-lg text-slate-300">
            Please review the following disclaimer regarding the use of our
            website and services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

            {/* Header */}
            <div className="bg-brand-950 px-8 py-8 text-white">
              <h2 className="text-3xl font-bold">
                Website Disclaimer
              </h2>
              <p className="mt-2 text-slate-300">
                Effective Date: June 01, 2026
              </p>
            </div>

            {/* Body */}
            <div className="p-8 md:p-12 space-y-10">

              <div>
                <h3 className="text-2xl font-bold text-brand-950 mb-4">
                  General Information
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  The information provided on the TruFlow HVAC website is for
                  general informational purposes only.
                </p>
              </div>

              <div className="border-t pt-8">
                <h3 className="text-2xl font-bold text-brand-950 mb-4">
                  No Professional Guarantee
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  While we strive to keep information accurate and current, we
                  make no warranties or guarantees regarding the completeness,
                  accuracy, reliability, or availability of any information on
                  this website.
                </p>
              </div>

              <div className="border-t pt-8">
                <h3 className="text-2xl font-bold text-brand-950 mb-4">
                  Service Estimates
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Any pricing, estimates, promotions, or service information
                  displayed on this website are subject to change and may vary
                  based on site conditions, equipment requirements, labor costs,
                  and other factors identified during inspection.
                </p>
              </div>

              <div className="border-t pt-8">
                <h3 className="text-2xl font-bold text-brand-950 mb-4">
                  Emergency Services
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Although we strive to respond promptly to service requests,
                  response times are not guaranteed and may vary based on
                  demand, weather conditions, staffing availability, and
                  geographic location.
                </p>
              </div>

              <div className="border-t pt-8">
                <h3 className="text-2xl font-bold text-brand-950 mb-4">
                  Third-Party Content
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  We are not responsible for the content, accuracy, or practices
                  of any third-party websites linked from this website.
                </p>
              </div>

              <div className="border-t pt-8">
                <h3 className="text-2xl font-bold text-brand-950 mb-4">
                  Limitation of Liability
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Your use of this website is at your own risk. TruFlow HVAC
                  shall not be liable for any losses or damages arising from the
                  use of information contained on this website.
                </p>
              </div>

              {/* Contact Card */}
              <div className="border-t pt-8">
                <h3 className="text-2xl font-bold text-brand-950 mb-6">
                  Contact Information
                </h3>

                <div className="bg-slate-100 rounded-2xl p-8">
                  <h4 className="font-bold text-xl text-brand-950 mb-4">
                    TruFlow HVAC
                  </h4>

                  <div className="space-y-3 text-slate-600">
                    <p>
                      <strong>Phone:</strong> (630) 999-0127
                    </p>

                    <p>
                      <strong>Email:</strong> truflowhvac@gmail.com
                    </p>

                    <p>
                      <strong>Address:</strong> Naperville, Illinois, USA
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}