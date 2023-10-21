import Layout from "@/features/ui/Layout";
import {
  Box,
  Heading,
  UnorderedList,
  ListItem,
  OrderedList,
  Divider,
  Link as ChakrLink,
} from "@chakra-ui/react";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <Box bg="gray.50" mt={2}>
        <Box
          p={6}
          maxW="1200px"
          mx="auto"
          bg="gray.50"
          borderRadius="md"
          boxShadow="sm"
          py={8}
          px={10}
        >
          <Heading
            as="h1"
            mb={6}
            color="teal.500"
            borderBottom="2px"
            borderColor="teal.500"
            pb={2}
          >
            ONE-TAP-SNIPPET プライバシーポリシー・免責事項
          </Heading>
          <Box mb={4} lineHeight="1.6" color="gray.700">
            当サイトは、以下のようにプライバシーポリシー・免責事項を定め、個人情報保護の重要性の認識と取り組みを行っております。
          </Box>
          <Heading as="h2" size="md" mb={2}>
            第1条（個人情報）
          </Heading>
          <Box mb={4} pl={4}>
            「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし，生存する個人に関する情報であって，当該情報に含まれる氏名，生年月日，住所，電話番号，連絡先その他の記述等により特定の個人を識別できる情報及び容貌，指紋，声紋にかかるデータ，及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。
          </Box>
          <Heading as="h2" size="md" mb={2}>
            第2条（個人情報の収集方法）
          </Heading>
          <Box mb={4} pl={4}>
            当サイトは、ユーザーが利用登録をする際に氏名、メールアドレスなどの個人情報をお尋ねすることがあります。また、ユーザーとの取引に関連して、ユーザーから契約内容や取引内容を収集することがあります。
          </Box>
          <Heading as="h2" size="md" mb={2}>
            第3条（個人情報を収集・利用する目的）
          </Heading>
          <Box mb={4} pl={4}>
            当サイトが個人情報を収集・利用する目的は、以下のとおりです。
            <OrderedList pl={4}>
              <ListItem>当サイトサービスの提供・運営のため</ListItem>
              <ListItem>ユーザーからのお問い合わせに回答するため</ListItem>
              <ListItem>
                ユーザーにご自身の登録情報の閲覧や変更，削除，ご利用状況の閲覧を行っていただくため
              </ListItem>
              <ListItem>その他、上記利用目的に付随する目的のため</ListItem>
            </OrderedList>
          </Box>
          <Heading as="h2" size="md" mb={2}>
            第4条（利用目的の変更）
          </Heading>
          <Box mb={4} pl={4}>
            <OrderedList pl={4}>
              <ListItem>
                当社は，利用目的が変更前と関連性を有すると合理的に認められる場合に限り，個人情報の利用目的を変更するものとします。
              </ListItem>
              <ListItem>
                利用目的の変更を行った場合には，変更後の目的について，当社所定の方法により，ユーザーに通知し，または本ウェブサイト上に公表するものとします。
              </ListItem>
            </OrderedList>
          </Box>
          <Heading as="h2" size="md" mb={2}>
            第5条（個人情報の第三者提供）
          </Heading>
          <Box pl={4}>
            <Box mb={4}>
              当社は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
            </Box>
            <OrderedList mb={4} pl={4}>
              <ListItem>
                人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき
              </ListItem>
              <ListItem>
                公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき
              </ListItem>
              <ListItem>
                国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
              </ListItem>
              <ListItem>
                予め次の事項を告知あるいは公表し、かつ当社が個人情報保護委員会に届出をしたとき
                <UnorderedList pl={4}>
                  <ListItem>利用目的に第三者への提供を含むこと</ListItem>
                  <ListItem>第三者に提供されるデータの項目</ListItem>
                  <ListItem>第三者への提供の手段または方法</ListItem>
                  <ListItem>
                    本人の求めに応じて個人情報の第三者への提供を停止すること
                  </ListItem>
                  <ListItem>本人の求めを受け付ける方法</ListItem>
                </UnorderedList>
              </ListItem>
            </OrderedList>
            <Box mb={4}>
              前項の定めにかかわらず、次に掲げる場合には、当該情報の提供先は第三者に該当しないものとします。
            </Box>
            <OrderedList mb={4} pl={4}>
              <ListItem>
                当社が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合
              </ListItem>
              <ListItem>
                合併その他の事由による事業の承継に伴って個人情報が提供される場合
              </ListItem>
              <ListItem>
                個人情報を特定の者との間で共同して利用する場合であって、その旨並びに共同して利用される個人情報の項目、共同して利用する者の範囲、利用する者の利用目的および当該個人情報の管理について責任を有する者の氏名または名称について、あらかじめ本人に通知し、または本人が容易に知り得る状態に置いた場合
              </ListItem>
            </OrderedList>
          </Box>
          <Heading as="h2" size="md" mb={2}>
            第6条（個人情報の開示）
          </Heading>
          <Box mb={4}>
            <OrderedList mb={4} pl={4}>
              <ListItem>
                当サイトは、ユーザーからの個人情報の開示要求があった場合、ユーザーに対して遅滞なく開示を行います（ただし、当サイトが該当する個人情報を保有していない場合は、その旨を通知します）。しかし、以下のいずれかに該当する場合は、その全部または一部を開示しないことがあります。
              </ListItem>
              <UnorderedList pl={4}>
                <ListItem>
                  ユーザーまたは第三者の生命、身体、財産その他の権利利益を害する恐れがある場合
                </ListItem>
                <ListItem>
                  当サイトの業務の適正な実施を妨げる恐れがある場合
                </ListItem>
                <ListItem>その他法令に違反することとなる場合</ListItem>
              </UnorderedList>
              <ListItem>
                前項の定めにかかわらず，履歴情報および特性情報などの個人情報以外の情報については，原則として開示いたしません。
              </ListItem>
            </OrderedList>
          </Box>
          <Heading as="h2" size="md" mb={2}>
            第7条（個人情報の訂正および削除）
          </Heading>
          <Box mb={4}>
            <OrderedList mb={4} pl={4}>
              <ListItem>
                ユーザーは，当社の保有する自己の個人情報が誤った情報である場合には，当社が定める手続きにより，当社に対して個人情報の訂正，追加または削除（以下，「訂正等」といいます。）を請求することができます。
              </ListItem>
              <ListItem>
                当社は，ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の訂正等を行うものとします。
              </ListItem>
              <ListItem>
                当社は，前項の規定に基づき訂正等を行った場合，または訂正等を行わない旨の決定をしたときは遅滞なく，これをユーザーに通知します。
              </ListItem>
            </OrderedList>
          </Box>
          <Heading as="h2" size="md" mb={2}>
            第8条（アクセス分析ツールの利用について）
          </Heading>
          <Box mb={4} pl={4} zIndex={10}>
            当サイトでは、サイト利用状況の把握のためにGoogle
            Analyticsを利用しております。Google
            Analyticsはトラフィックデータの収集のためにCookieを使用しています。データは匿名で収集されており、個人を特定するものではありません。この機能はブラウザの設定でCookieを無効にすることで拒否することができます。詳細は下記のポリシーをご参照ください。
            <br />
            <ChakrLink
              href="https://policies.google.com/technologies/partner-sites"
              isExternal
              color="blue.500"
            >
              Googleのポリシー
            </ChakrLink>
          </Box>
          <Heading as="h2" size="md" mb={2}>
            第9条（個人情報の利用停止等）
          </Heading>
          <Box mb={4} pl={4}>
            <OrderedList mb={4} pl={4}>
              <ListItem>
                当社は，本人から，個人情報が，利用目的の範囲を超えて取り扱われているという理由，または不正の手段により取得されたものであるという理由により，その利用の停止または消去（以下，「利用停止等」といいます。）を求められた場合には，遅滞なく必要な調査を行います。
              </ListItem>
              <ListItem>
                前項の調査結果に基づき，その請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の利用停止等を行います。
              </ListItem>
              <ListItem>
                当社は，前項の規定に基づき利用停止等を行った場合，または利用停止等を行わない旨の決定をしたときは，遅滞なく，これをユーザーに通知します。
              </ListItem>
              <ListItem>
                前2項にかかわらず，利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合であって，ユーザーの権利利益を保護するために必要なこれに代わるべき措置をとれる場合は，この代替策を講じるものとします。
              </ListItem>
            </OrderedList>
          </Box>
          <Heading as="h2" size="md" mb={2}>
            第10条（広告の配信について）
          </Heading>
          <Box mb={4} pl={4}>
            当サイトでは、第三者配信の広告サービス
            <ChakrLink
              href="https://www.google.co.jp/adsense/start/"
              isExternal
              color="blue"
            >
              Google Adsense グーグルアドセンス
            </ChakrLink>
            を利用しています。このような広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、
            クッキー（Cookie）を使用しております。
            クッキーを使用することで当サイトはお客様のコンピュータを識別できるようになりますが、お客様個人を特定できるものではありません。
            Cookie（クッキー）を無効にする設定およびGoogleアドセンスに関する詳細は
            <ChakrLink
              href="https://policies.google.com/technologies/ads?hl=ja"
              isExternal
              color="blue"
            >
              広告 – ポリシーと規約 – Google
            </ChakrLink>
            をご覧ください。
            <br />
            注記）クッキー（Cookie）とは：当サイトや他サイトへのアクセスに関する情報で、氏名、住所、メールアドレス、電話番号は含まれていません。
            <br />
            {/* また、当サイトは、
            <ChakrLink href="https://www.amazon.co.jp/" isExternal color="blue">
              Amazon.co.jp
            </ChakrLink>
            を宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイトプログラムの参加者です。 */}
            第三者がコンテンツおよび宣伝を提供し、訪問者から直接情報を収集し、訪問者のブラウザにCookie（クッキー）を設定したりこれを認識したりする場合があります。
          </Box>
          <Heading as="h2" size="md" mb={2}>
            第11条（当サイトの免責事項）
          </Heading>
          <Box mb={4} pl={4}>
            当サイトは、アフィリエイトプログラムを使って商品を紹介しており、直接の販売は行っておりません。商品に関するお問い合わせは、販売店様のほうに直接ご連絡くださいますようお願いいたします。当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。また、リンク先サイトの正確性や合法性、その内容について一切保証するものではありません。商品やサービスのご購入に関する最終的な判断は、ご自身の責任でお願いいたします。当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、必ずしもそれらの正確性や安全性等を保証するものではありません。誤情報が入り込んだり、情報が古くなっていることもございます。万が一、当サイトに掲載された内容によって発生したトラブルや損害等の一切の責任を負いかねます。あらかじめご了承くださいますようお願いいたします。また、本免責事項、および当サイトに掲載しているすべてのコンテンツは、予告なしに変更・削除されることがあります。
            予めご了承下さい。
          </Box>

          <Heading as="h2" size="md" mb={2}>
            第12条（著作権・肖像権について）
          </Heading>
          <Box mb={4} pl={4}>
            当サイトで掲載している文章や画像などにつきましては、著作権は放棄しておりません。当サイトに存在する、文章・画像・動画等の著作物の情報を無断転載することを禁止します。引用の範囲を超えるものについては、法的処置を行います。転載を希望される方は、「お問い合わせ」よりご連絡をお願いします。また、当サイトは著作権の侵害を目的とするものではありません。使用している版権物の知的所有権はそれぞれの著作者・団体に帰属しております。著作権や肖像権に関して問題がありましたら御連絡下さい。著作権所有者様からの警告及び修正・撤去のご連絡があった場合は迅速に対処または削除致します。
          </Box>
          <Heading as="h2" size="md" mb={2}>
            第13条（リンクについて）
          </Heading>
          <Box mb={4} pl={4}>
            当サイトは基本的にリンクフリーです。リンクを行う場合の許可や連絡は不要です。ただし、当サイトに掲載されている画像への直リンクや、インラインフレームによる当サイトのコンテンツの使用はご遠慮ください。
          </Box>
          <Heading as="h2" size="md" mb={2}>
            第14条（当サイトのプライバシーポリシー・免責事項の変更について）
          </Heading>
          <Box mb={4} pl={4}>
            当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシー及び免責事項の内容を適宜見直しその改善に努めます。修正された最新のプライバシーポリシーと免責事項は常に本ページにて開示されます。
          </Box>
          <Heading as="h2" size="md" mb={2}>
            第15条（お問い合わせ）
          </Heading>
          <Box mb={4} pl={4}>
            本ポリシー・免責事項に関するお問い合わせは、下記の窓口までご連絡ください。
            <br />
            <Box color="blue">
              <Link href="/contactme">問い合わせフォーム</Link>
            </Box>
          </Box>
          <Divider mb={2} />
          <Heading as="h2" size="sm" mb={2}>
            当サイトの運営者情報
          </Heading>
          <Box mb={4} pl={4}>
            運営者：Cyanoptilas
            <br />
            サイト名：ONE-TAP-SNIPPET
            <br />
            サイトURL：http://one-tap-snippet.com/
          </Box>
          <Heading as="h2" size="sm" mb={2}>
            初出掲載日・最終改定日
          </Heading>
          <Box mb={4} pl={4}>
            初出掲載日：2023年9月28日
            <br />
            最終改定日：2023年10月21日
          </Box>
          <Divider />
        </Box>
      </Box>
    </Layout>
  );
};

export default PrivacyPolicy;
