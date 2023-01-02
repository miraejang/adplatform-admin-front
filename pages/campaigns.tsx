import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Pagination from "../components/pagination";
import viewerMode from "../components/states";
import { Body, Head, Row, Table } from "../styles/table";

type ObjectiveType =
  | "WEBSITE_CONVERSIONS"
  | "WEBSITE_TRAFFIC"
  | "SALES"
  | "APP_INSTALLATION"
  | "LEAD"
  | "BRAND"
  | "VIDEO_VIEWS";
type Objective = {
  [key in ObjectiveType]: string;
};
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
interface ICampaigns {
  content: CampaignsContent[];
  total_elements: number;
  total_pages: number;
  last: boolean;
  number: number;
  size: number;
  number_of_elements: number;
  first: boolean;
  empty: boolean;
}

const ToggleBox = styled.div`
  label {
    display: block;
    position: relative;
    width: 100%;
    height: 1.5rem;
    border-radius: 2rem;
    overflow: hidden;
    transition: all 1s;
  }

  input::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ccc;
  }
  input:checked::before {
    background-color: ${({ theme }) => theme.colors.pointBlue};
  }
  input::after {
    content: "";
    display: block;
    position: absolute;
    top: 0.2rem;
    left: 0.3rem;
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 50%;
    background-color: #fff;
    transition: left 0.2s linear;
  }
  input:checked::after {
    left: calc(100% - 1.4rem);
  }
  input:disabled {
    opacity: 0.3;
  }
`;

const objective: Objective = {
  WEBSITE_CONVERSIONS: "웹사이트 전환",
  WEBSITE_TRAFFIC: "웹사이트 트래픽",
  SALES: "판매",
  APP_INSTALLATION: "앱설치",
  LEAD: "리드",
  BRAND: "브랜드 인지도 및 도달 범위",
  VIDEO_VIEWS: "동영상 조회",
};

const Campaigns = ({ results }: ICampaigns) => {
  const viewer = useRecoilValue(viewerMode);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const onStatusChange = (id: number) => {
    results.content.map((campaign: CampaignsContent) => {
      if (campaign.id === id) {
        campaign.enabled = !campaign.enabled;
      }
    });
  };
  const pageHandler = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <h1>캠페인 관리</h1>
      <Table>
        <Head>
          <Row>
            <div className="status">
              <div>상태</div>
            </div>
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
          {results.content
            .slice(results.size * (currentPage - 1), results.size * currentPage)
            .map((campaign: CampaignsContent) => (
              <Row key={campaign.id}>
                <div className="status">
                  <ToggleBox>
                    <label htmlFor="status">
                      <input
                        onChange={() => onStatusChange(campaign.id)}
                        type="checkbox"
                        name="status"
                        id="status"
                        checked={campaign.enabled}
                        disabled={viewer === "viewer"}
                      />
                    </label>
                  </ToggleBox>
                </div>
                <div className="name">{campaign.name}</div>
                <div className="objective">
                  {objective[campaign.campaign_objective as ObjectiveType]}
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
      <Pagination
        total={results.total_pages}
        current={currentPage}
        changeCurrent={pageHandler}
      />
    </>
  );
};

export default Campaigns;

export async function getServerSideProps() {
  const results = await (
    await fetch(`http://localhost:3000/api/campaigns`)
  ).json();

  return {
    props: { results },
  };
}
