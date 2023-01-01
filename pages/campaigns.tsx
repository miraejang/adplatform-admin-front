import styled from "styled-components";

interface Company {
  id: Number;
  name: String;
}
interface User {
  id: Number;
  email: String;
  name: String;
  company: Company;
}

const data = {
  content: [
    {
      id: 1,
      name: "캠페인1",
      enabled: true,
      campaign_objective: "WEBSITE_TRAFFIC",
      impressions: 384057,
      clicks: 1974,
      ctr: 0.8752,
      video_views: 948,
      vtr: 0.95123,
    },
    {
      id: 2,
      name: "캠페인2",
      enabled: true,
      campaign_objective: "LEAD",
      impressions: 705575,
      clicks: 6726,
      ctr: 0.8733,
      video_views: 40,
      vtr: 0.135,
    },
    {
      id: 3,
      name: "캠페인3",
      enabled: true,
      campaign_objective: "LEAD",
      impressions: 538086,
      clicks: 1171,
      ctr: 0.3833,
      video_views: 512,
      vtr: 0.2512,
    },
  ],
  size: 25,
  total_elements: 2,
  total_pages: 1,
};

interface Objective {
  WEBSITE_CONVERSIONS: string;
  WEBSITE_TRAFFIC: string;
  SALES: string;
  APP_INSTALLATION: string;
  LEAD: string;
  BRAND: string;
  VIDEO_VIEWS: string;
}
type CampaignsContent = {
  id: number;
  name: string;
  enabled: boolean;
  campaign_objective: keyof Objective;
  impressions: number;
  clicks: number;
  ctr: number;
  video_views: number;
  vtr: number;
};
type Campaigns = {
  content: CampaignsContent[];
  total_elements: number;
  total_pages: number;
  last: boolean;
  number: number;
  size: number;
  number_of_elements: number;
  first: boolean;
  empty: boolean;
};

const Row = styled.div`
  display: flex;
  padding: 1rem 1rem 1rem 0;
  color: ${({ theme }) => theme.colors.txt};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

  div {
    flex: 1;
    text-align: left;
  }
  .fit {
    flex-basis: fit-content;
    text-align: center;
  }
  .right {
    text-align: right;
  }
  .center {
    text-align: center;
  }
`;
const Table = styled.div``;
const Head = styled.div`
  ${Row} {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.txtLigthGray};
  }
`;
const Body = styled.div``;

const Campaigns = () => {
  const objective: Objective = {
    WEBSITE_CONVERSIONS: "웹사이트 전환",
    WEBSITE_TRAFFIC: "웹사이트 트래픽",
    SALES: "판매",
    APP_INSTALLATION: "앱설치",
    LEAD: "리드",
    BRAND: "브랜드 인지도 및 도달 범위",
    VIDEO_VIEWS: "동영상 조회",
  };

  return (
    <>
      <h1>캠페인 관리</h1>
      <Table>
        <Head>
          <Row>
            <div className="status fit">상태</div>
            <div className="name">캠페인명</div>
            <div className="objective">캠페인 목적</div>
            <div className="impressions right">노출수</div>
            <div className="clicks right">클릭수</div>
            <div className="ctr right">CTR</div>
            <div className="video_views right">동영상조회수</div>
            <div className="vtr right">VTR</div>
          </Row>
        </Head>
        <Body>
          {data.content.map((campaign) => (
            <Row key={campaign.id}>
              <div className="status fit">
                <label htmlFor="status">
                  <input
                    type="checkbox"
                    name="status"
                    id="status"
                    checked={campaign.enabled}
                  />
                </label>
              </div>
              <div className="name">{campaign.name}</div>
              <div className="objective">
                {objective[campaign.campaign_objective as keyof Objective]}
              </div>
              <div className="impressions right">
                {campaign.impressions.toLocaleString()}
              </div>
              <div className="clicks right">
                {campaign.clicks.toLocaleString()}
              </div>
              <div className="ctr right">{`${(
                +campaign.ctr.toFixed(2) * 100
              ).toLocaleString()}%`}</div>
              <div className="video_views right">
                {campaign.video_views.toLocaleString()}
              </div>
              <div className="vtr right">{`${(
                +campaign.vtr.toFixed(2) * 100
              ).toLocaleString()}%`}</div>
            </Row>
          ))}
        </Body>
      </Table>
    </>
  );
};

export default Campaigns;
