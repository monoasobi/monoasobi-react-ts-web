import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 비율 */
  height: 0;
  overflow: hidden;
  max-width: 100%;
`;

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
`;

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
}

export const YouTubeEmbed = ({
  videoId,
  title = "YouTube video player",
}: YouTubeEmbedProps) => {
  return (
    <Container>
      <Iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </Container>
  );
};
