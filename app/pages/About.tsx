import Content from "@/components/Content";
import Form from "@/components/Form";
import Header from "@/components/Header";

export default function About() {
	return (
		<section id="about">
			<Header title="About" />

			<Content>
				<div className="grid md:gap-10 md:grid-cols-[1fr_2fr] place-items-center">
					<div className="mb-5">
						<img
							src="/images/profile.png"
							alt="profile picture"
							width={200}
							height={200}
							className="border-[5px] rounded-full border-azama-white"
						/>
					</div>
					<div className="max-w-[75ch]">
						<h2 className="text-3xl">Hello World!</h2>
						<p>
							My name is Álvaro and I am a Full Stack Developer.
							<br />
							I feel very fortunate to have found what I am passionate about and
							to make it my job.
							<br />
							I have also worked managing, training and leading marketing teams
							at a national level.
							<br />
							If there is one thing that characterises me, it is that I am 100%
							involved in everything I do.
							<br />
							I am hard-working, perfectionist and non-conformist.
							<br />
							I have a direct and creative working style. And I put all the
							energy I get from working in what I am so enthusiastic about.
						</p>
					</div>
				</div>
			</Content>

			<Form />
		</section>
	);
}
