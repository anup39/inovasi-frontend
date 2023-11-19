import '../../css/homepage/HomeFeatures.css';

function HomeFeatures() {
  return (
    <div className='w-screen bg-[#F7F7F7] flex '>
      <div className='innerContainer'>
        <div className='individualItems'>
          <img
            className='scale-90'
            src='../../../public/mapplingsupplierhome.svg'
            alt=''
          />
          <h1 className='font-semibold'>Mapping Suppliers</h1>
          <p>
            Agriplot long-term datasets provide comprehensive supplyshed
            supplier mapping from smallholder plots to the corporate estate
            area, align with the legal boundary from recognize national land
            registration system to ensure the EUDR requirements
          </p>
        </div>
        <div className='individualItems'>
          <img
            className='scale-90'
            src='../../../public/riskassesmemthome.svg'
            alt=''
          />
          <h1 className='font-semibold'>Risk Assessment</h1>
          <p>
            Agriplot long-term datasets provide comprehensive supplyshed
            supplier mapping from smallholder plots to the corporate estate
            area, align with the legal boundary from recognize national land
            registration system to ensure the EUDR requirements
          </p>
        </div>
      </div>
      <div className='innerContainer'>
        <div className='individualItems'>
          <img
            className='scale-90'
            src='../../../public/suppiermonitoringhome.svg'
            alt=''
          />
          <h1 className='font-semibold'>Supplier Monitoring</h1>
          <p>
            Since 2014 our supplier group monitoring already provide valuable
            data intelligence on the deforestation monitoring with high accuracy
            and actionable data and continue to make sure the support for the
            EUDR implementation
          </p>
        </div>
        <div className='individualItems'>
          <img
            className='scale-90'
            src='../../../public/riskmitigationhome.svg'
            alt=''
          />
          <h1 className='font-semibold'>Risk Mitigation</h1>
          <p>
            Since 2014 our supplier group monitoring already provide valuable
            data intelligence on the deforestation monitoring with high accuracy
            and actionable data and continue to make sure the support for the
            EUDR implementation
          </p>
        </div>
      </div>
    </div>
  );
}
export default HomeFeatures;
