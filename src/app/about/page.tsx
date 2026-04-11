import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default function About() {
	return (
		<div>
			<Link
				href="/"
				className="mt-4 block px-8 sm:px-4 w-fit text-zinc-600 dark:text-zinc-400 hover:text-foreground dark:hover:text-foreground"
			>
				<MoveLeft />
			</Link>

			<div className="mx-auto px-4 mt-6 text-sm sm:text-base space-y-4 leading-relaxed">
				<p>ここは null を媒介として、みんなの "熱" を伝えるプライベートメディアです。</p>
				<p>気になっていること、体験したこと、熱中していること。文章でも作品でも、形式は問いません。</p>
				<p>クローズドなカルチャーメディアですから、せいぜい私の友達とそのお友達くらいまでが訪れる場所です。だからって侮ってはいけません。なんせ私の友達の友達のお父さんの友達はあの "松本人志" ですから。</p>
				<p>兎にも角にも、好きなことがある人もない人も、今の "熱" を臆さず残していってください。</p>
				<p>こういうの、歳を重ねるにつれて見えなくなるものだと思うから、今のうちに。</p>
				<p>ただし、ひとつだけルールがあります。</p>
				<p>それは "読者" を意識すること。</p>
				<p>ここは SNS のように一方的に呟く場所でなく、"自分" と "読者" とを繋ぐ場所です。もちろん、過去や未来の "私" あるいは "あなた" も読者に含みますのでご安心を。</p>
				<p>ここに残した "熱" が、明日誰かの会話で引用されるかもしれない。誰かの思考に影響を与えるかもしれない。あるいは、それぞれの熱が通じて、誰かとの距離がまた近づくかもしれない、誰かが増えるかもしれない。</p>
				<p>過去も未来もクソ食らえですが、いつの日か、みんなで残した "熱" を編纂しよう！</p>
			</div>
		</div>
	);
}
