import React from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

interface ShareSocialInterface {
    url: string;
}

const ShareSocial = ({ url }: ShareSocialInterface) => {
  return (
    <div className="flex px-2 py-1 gap-2">
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={32} round={true} />
      </LinkedinShareButton>
      <EmailShareButton url={url}>
        <EmailIcon size={32} round={true} />
      </EmailShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
    </div>
  );
};

export default ShareSocial;
