# 50 manually curated Indian legal Q&A pairs
# Answers verified against actual judgements

BENCHMARK = [
    {
        "id": "bench_001",
        "question": "What did the Supreme Court hold in Maneka Gandhi v. Union of India regarding Article 21?",
        "reference_answer": "The Supreme Court held that the right to personal liberty under Article 21 cannot be curtailed except by a procedure that is fair, just and reasonable. The court expanded Article 21 beyond its literal meaning, establishing that any law restricting personal liberty must also satisfy Articles 14 and 19.",
        "category": "constitutional_law"
    },
    {
        "id": "bench_002",
        "question": "What is the ratio decidendi of Kesavananda Bharati v. State of Kerala?",
        "reference_answer": "The Supreme Court held that Parliament has the power to amend the Constitution under Article 368 but cannot alter or destroy its basic structure or essential features. This established the Basic Structure doctrine.",
        "category": "constitutional_law"
    },
    {
        "id": "bench_003",
        "question": "What did the Supreme Court hold in K.S. Puttaswamy v. Union of India regarding privacy?",
        "reference_answer": "The Supreme Court unanimously held that the right to privacy is a fundamental right protected under Article 21 of the Constitution, overruling the earlier decisions in M.P. Sharma and Kharak Singh.",
        "category": "constitutional_law"
    },
    {
        "id": "bench_004",
        "question": "What is the scope of Article 14 of the Indian Constitution?",
        "reference_answer": "Article 14 guarantees equality before law and equal protection of laws. The Supreme Court has held that it prohibits arbitrary action and requires that classification must be founded on intelligible differentia which distinguishes persons grouped together from others left out.",
        "category": "constitutional_law"
    },
    {
        "id": "bench_005",
        "question": "What did the Supreme Court hold in ADM Jabalpur v. Shivkant Shukla?",
        "reference_answer": "The Supreme Court held by majority that during a proclaimed Emergency, the right to move any court for enforcement of fundamental rights under Articles 14, 21 and 22 stands suspended. Justice Khanna dissented, holding that Article 21 cannot be suspended even during Emergency.",
        "category": "constitutional_law"
    },
    {
        "id": "bench_006",
        "question": "What are the essential ingredients of murder under Section 302 IPC?",
        "reference_answer": "Murder under Section 302 IPC requires causing death of a person with the intention of causing death, or with the intention of causing such bodily injury as the offender knows to be likely to cause death, or with the knowledge that the act is so imminently dangerous that it must in all probability cause death.",
        "category": "criminal_law"
    },
    {
        "id": "bench_007",
        "question": "What is the difference between culpable homicide and murder under IPC?",
        "reference_answer": "Culpable homicide under Section 299 IPC is the genus and murder under Section 300 is the species. All murders are culpable homicides but not all culpable homicides are murders. The distinction lies in the degree of intention and knowledge, with murder requiring higher degree of mens rea.",
        "category": "criminal_law"
    },
    {
        "id": "bench_008",
        "question": "What did the Supreme Court hold in Bachan Singh v. State of Punjab regarding death penalty?",
        "reference_answer": "The Supreme Court upheld the constitutional validity of the death penalty and held that it should be imposed only in the rarest of rare cases when the alternative option of life imprisonment is unquestionably foreclosed.",
        "category": "criminal_law"
    },
    {
        "id": "bench_009",
        "question": "What are the conditions for grant of bail under Section 437 CrPC?",
        "reference_answer": "Under Section 437 CrPC, bail may be granted to a person accused of a non-bailable offence if the court is satisfied that there are reasonable grounds to believe the accused is not guilty and is unlikely to commit any offence while on bail. Special considerations apply for offences punishable with death or life imprisonment.",
        "category": "criminal_law"
    },
    {
        "id": "bench_010",
        "question": "What is the right to a speedy trial under Article 21?",
        "reference_answer": "The Supreme Court in Hussainara Khatoon v. State of Bihar held that the right to speedy trial is a fundamental right implicit in Article 21. Unreasonable delay in trial violates the right to life and personal liberty.",
        "category": "criminal_law"
    },
    {
        "id": "bench_011",
        "question": "What is the doctrine of res judicata under the Civil Procedure Code?",
        "reference_answer": "Section 11 CPC embodies the doctrine of res judicata which bars a court from trying any suit or issue which has been directly and substantially in issue in a former suit between the same parties litigating under the same title and has been heard and finally decided by a competent court.",
        "category": "civil_procedure"
    },
    {
        "id": "bench_012",
        "question": "What is the limitation period for filing a suit for recovery of money?",
        "reference_answer": "Under the Limitation Act 1963, the limitation period for a suit for recovery of money on a simple contract is three years from the date the right to sue accrues, which is typically when the debt becomes due and payable.",
        "category": "civil_procedure"
    },
    {
        "id": "bench_013",
        "question": "What are the essential elements of a valid contract under the Indian Contract Act?",
        "reference_answer": "Under the Indian Contract Act 1872, a valid contract requires an offer, acceptance, lawful consideration, capacity of parties to contract, free consent, and a lawful object. An agreement not enforceable by law is void.",
        "category": "contract_law"
    },
    {
        "id": "bench_014",
        "question": "What is the doctrine of frustration under the Indian Contract Act?",
        "reference_answer": "Section 56 of the Indian Contract Act embodies the doctrine of frustration. A contract becomes void when after the contract is made, its performance becomes impossible or unlawful by reason of some event which the promisor could not prevent.",
        "category": "contract_law"
    },
    {
        "id": "bench_015",
        "question": "What did the Supreme Court hold in Olga Tellis v. Bombay Municipal Corporation?",
        "reference_answer": "The Supreme Court held that the right to livelihood is an integral part of the right to life under Article 21. Eviction of pavement dwellers without providing alternative accommodation was held to violate Article 21 as it deprived them of their livelihood.",
        "category": "constitutional_law"
    },
    {
        "id": "bench_016",
        "question": "What is the scope of judicial review under Article 32 of the Constitution?",
        "reference_answer": "Article 32 guarantees the right to move the Supreme Court for enforcement of fundamental rights. The Supreme Court has held that the right guaranteed under Article 32 is itself a fundamental right and the court has wide powers to issue appropriate writs, directions or orders.",
        "category": "constitutional_law"
    },
    {
        "id": "bench_017",
        "question": "What is the principle of natural justice in Indian administrative law?",
        "reference_answer": "Natural justice comprises two main principles: audi alteram partem (hear the other side) and nemo judex in causa sua (no one should be a judge in his own cause). These principles require that a person must be given notice and an opportunity to be heard before any adverse order is passed against them.",
        "category": "administrative_law"
    },
    {
        "id": "bench_018",
        "question": "What did the Supreme Court hold in Selvi v. State of Karnataka regarding narco analysis?",
        "reference_answer": "The Supreme Court held that narco analysis, brain mapping and polygraph tests conducted without the consent of the accused violate the right against self-incrimination under Article 20(3) and the right to personal liberty under Article 21.",
        "category": "criminal_law"
    },
    {
        "id": "bench_019",
        "question": "What is the doctrine of promissory estoppel in Indian law?",
        "reference_answer": "The doctrine of promissory estoppel holds that where a person makes a representation or promise intending it to be acted upon, and another person acts on it to their detriment, the person making the representation is estopped from going back on it even without consideration.",
        "category": "contract_law"
    },
    {
        "id": "bench_020",
        "question": "What are the fundamental rights guaranteed under Article 19 of the Constitution?",
        "reference_answer": "Article 19 guarantees six freedoms to citizens: freedom of speech and expression, freedom to assemble peaceably, freedom to form associations, freedom to move freely throughout India, freedom to reside in any part of India, and freedom to practice any profession or carry on any occupation.",
        "category": "constitutional_law"
    },
    {
        "id": "bench_021",
        "question": "What is the scope of the right to education under Article 21A?",
        "reference_answer": "Article 21A inserted by the 86th Constitutional Amendment provides that the State shall provide free and compulsory education to all children between the age of six to fourteen years in such manner as the State may by law determine.",
        "category": "constitutional_law"
    },
    {
        "id": "bench_022",
        "question": "What did the Supreme Court hold in Joseph Shine v. Union of India regarding adultery?",
        "reference_answer": "The Supreme Court struck down Section 497 IPC which criminalized adultery, holding it unconstitutional as it violated Articles 14, 15 and 21. The court held the provision was based on gender stereotypes treating women as property of their husbands.",
        "category": "constitutional_law"
    },
    {
        "id": "bench_023",
        "question": "What is adverse possession under Indian property law?",
        "reference_answer": "Adverse possession is a method of acquiring title to property by possessing it openly, continuously, hostilely and exclusively for a statutory period of 12 years under the Limitation Act. The possession must be without the owner's permission.",
        "category": "property_law"
    },
    {
        "id": "bench_024",
        "question": "What is the rule against perpetuity under the Transfer of Property Act?",
        "reference_answer": "Section 14 of the Transfer of Property Act embodies the rule against perpetuity. No transfer of property can operate to create an interest which is to take effect after the lifetime of one or more persons living at the date of such transfer and the minority of some person.",
        "category": "property_law"
    },
    {
        "id": "bench_025",
        "question": "What is the presumption of innocence in criminal law?",
        "reference_answer": "The presumption of innocence is a fundamental principle of criminal law that every person accused of a crime is presumed to be innocent until proven guilty beyond reasonable doubt. The burden of proof lies on the prosecution to establish guilt.",
        "category": "criminal_law"
    },
    {
        "id": "bench_026",
        "question": "What did the Supreme Court hold regarding anticipatory bail under Section 438 CrPC?",
        "reference_answer": "The Supreme Court in Siddharam Satlingappa Mhetre v. State of Maharashtra held that anticipatory bail is a device to secure individual's liberty and should not be limited by putting a time limit. Courts must apply the twin tests of prima facie case and likelihood of misuse of liberty.",
        "category": "criminal_law"
    },
    {
        "id": "bench_027",
        "question": "What is the doctrine of basic structure of the Constitution?",
        "reference_answer": "The basic structure doctrine established in Kesavananda Bharati holds that certain fundamental features of the Constitution cannot be amended by Parliament even under Article 368. These include supremacy of the Constitution, republican and democratic form of government, secularism, separation of powers and judicial review.",
        "category": "constitutional_law"
    },
    {
        "id": "bench_028",
        "question": "What are the rights of an arrested person under Article 22 of the Constitution?",
        "reference_answer": "Article 22 provides that an arrested person has the right to be informed of the grounds of arrest, the right to consult and be defended by a legal practitioner of their choice, and the right to be produced before a magistrate within 24 hours of arrest.",
        "category": "constitutional_law"
    },
    {
        "id": "bench_029",
        "question": "What is the scope of freedom of speech under Article 19(1)(a)?",
        "reference_answer": "Freedom of speech and expression under Article 19(1)(a) includes the right to express one's views through any medium. It includes freedom of press, right to information and right to silence. Reasonable restrictions can be imposed under Article 19(2) on grounds of sovereignty, security, public order, decency and morality.",
        "category": "constitutional_law"
    },
    {
        "id": "bench_030",
        "question": "What did the Supreme Court hold regarding the right to food as part of Article 21?",
        "reference_answer": "The Supreme Court has held that the right to food is a component of the right to life under Article 21. In PUCL v. Union of India, the court passed extensive orders directing States to implement food security schemes and ensure that food grains reach the hungry.",
        "category": "constitutional_law"
    },
    {
        "id": "bench_031",
        "question": "What is the test for determining whether a law violates Article 14?",
        "reference_answer": "A law violates Article 14 if it is arbitrary or does not satisfy the twin tests: first, that the classification is founded on an intelligible differentia which distinguishes persons grouped together from others; and second, that the differentia has a rational relation to the object sought to be achieved.",
        "category": "constitutional_law"
    },
    {
        "id": "bench_032",
        "question": "What is the doctrine of colourable legislation?",
        "reference_answer": "The doctrine of colourable legislation holds that what cannot be done directly cannot be done indirectly. If the legislature lacks competence to enact a law directly, it cannot achieve the same result indirectly by clothing the legislation in a different form.",
        "category": "constitutional_law"
    },
    {
        "id": "bench_033",
        "question": "What are the essential elements of negligence in tort law?",
        "reference_answer": "Negligence in tort law requires establishing four elements: a duty of care owed by the defendant to the plaintiff, breach of that duty, causation showing the breach caused the damage, and actual damage suffered by the plaintiff as a result.",
        "category": "tort_law"
    },
    {
        "id": "bench_034",
        "question": "What is the rule in Rylands v. Fletcher as applied in India?",
        "reference_answer": "The rule in Rylands v. Fletcher imposes strict liability on a person who brings onto their land something likely to do mischief if it escapes. Indian courts have applied and extended this rule, with the Supreme Court in MC Mehta v. Union of India developing the absolute liability principle for hazardous industries.",
        "category": "tort_law"
    },
    {
        "id": "bench_035",
        "question": "What is the scope of writ of habeas corpus?",
        "reference_answer": "Habeas corpus is a writ directing a person who detains another to produce the detained person before the court. It is used to challenge illegal detention and the court can order release if the detention is found to be without legal authority or in violation of fundamental rights.",
        "category": "constitutional_law"
    },
    {
        "id": "bench_036",
        "question": "What is the principle of locus standi in Indian courts?",
        "reference_answer": "Locus standi refers to the legal right to bring an action in court. Traditional rules required that only a person whose legal right was infringed could file a suit. However, with the development of Public Interest Litigation, the Supreme Court relaxed this requirement allowing any person to approach the court on behalf of those who cannot.",
        "category": "civil_procedure"
    },
    {
        "id": "bench_037",
        "question": "What did the Supreme Court hold regarding preventive detention under Article 22?",
        "reference_answer": "The Supreme Court has held that preventive detention is an exceptional power and must strictly comply with constitutional safeguards under Article 22. The detenu must be informed of grounds of detention, given opportunity to make representation, and the detention must be reviewed by an Advisory Board.",
        "category": "constitutional_law"
    },
    {
        "id": "bench_038",
        "question": "What is the scope of Article 300A regarding right to property?",
        "reference_answer": "Article 300A provides that no person shall be deprived of his property save by authority of law. Though the right to property is no longer a fundamental right, the Supreme Court has held it remains a constitutional right and the state must follow due process before depriving a person of property.",
        "category": "property_law"
    },
    {
        "id": "bench_039",
        "question": "What are the grounds for divorce under the Hindu Marriage Act?",
        "reference_answer": "The Hindu Marriage Act 1955 provides grounds for divorce including adultery, cruelty, desertion for two years, conversion to another religion, unsoundness of mind, leprosy, venereal disease, renunciation of the world, and presumption of death. The irretrievable breakdown of marriage has been recognized by courts as an additional ground.",
        "category": "family_law"
    },
    {
        "id": "bench_040",
        "question": "What is the scope of judicial review of administrative action?",
        "reference_answer": "Judicial review of administrative action examines whether the action is within the powers conferred, whether relevant considerations were taken into account and irrelevant ones excluded, whether the decision is reasonable and not arbitrary, and whether principles of natural justice were followed.",
        "category": "administrative_law"
    },
    {
        "id": "bench_041",
        "question": "What did the Supreme Court hold regarding reservation under Article 16?",
        "reference_answer": "The Supreme Court in Indra Sawhney v. Union of India upheld 27% reservation for OBCs but struck down the 10% reservation for economically weaker sections among forward classes. The court held that total reservation cannot exceed 50% and the creamy layer must be excluded.",
        "category": "constitutional_law"
    },
    {
        "id": "bench_042",
        "question": "What is the doctrine of sovereign immunity in India?",
        "reference_answer": "The doctrine of sovereign immunity traditionally protected the state from tortious liability for acts done in exercise of sovereign functions. However, Indian courts have progressively narrowed this doctrine, holding the state liable for negligence of its servants even in many sovereign functions.",
        "category": "tort_law"
    },
    {
        "id": "bench_043",
        "question": "What is the scope of the right against self-incrimination under Article 20(3)?",
        "reference_answer": "Article 20(3) provides that no person accused of any offence shall be compelled to be a witness against himself. The Supreme Court has held this applies only to persons accused of offences and protects against testimonial compulsion but not compulsion to produce documents or submit to physical examination.",
        "category": "constitutional_law"
    },
    {
        "id": "bench_044",
        "question": "What is the effect of acknowledgment on limitation under the Limitation Act?",
        "reference_answer": "Under Section 18 of the Limitation Act, an acknowledgment of liability in writing signed by the party against whom the right is claimed before the expiry of the limitation period creates a fresh period of limitation from the date of acknowledgment.",
        "category": "civil_procedure"
    },
    {
        "id": "bench_045",
        "question": "What did the Supreme Court hold in Vishaka v. State of Rajasthan?",
        "reference_answer": "The Supreme Court laid down guidelines to prevent sexual harassment of women at the workplace, holding that sexual harassment violates the fundamental rights under Articles 14, 15, 19 and 21. The Vishaka guidelines were binding until a legislative enactment was made, which came through the POSH Act 2013.",
        "category": "constitutional_law"
    },
    {
        "id": "bench_046",
        "question": "What is the scope of freedom of religion under Articles 25 and 26?",
        "reference_answer": "Article 25 guarantees freedom of conscience and the right to freely profess, practice and propagate religion, subject to public order, morality and health. Article 26 gives religious denominations the right to manage their own affairs in matters of religion.",
        "category": "constitutional_law"
    },
    {
        "id": "bench_047",
        "question": "What are the elements of a valid gift under the Transfer of Property Act?",
        "reference_answer": "Under Section 122 of the Transfer of Property Act, a gift is a transfer of movable or immovable property made voluntarily and without consideration. For immovable property, the gift must be effected by a registered instrument signed by the donor and attested by two witnesses.",
        "category": "property_law"
    },
    {
        "id": "bench_048",
        "question": "What is the doctrine of part performance under the Transfer of Property Act?",
        "reference_answer": "Section 53A of the Transfer of Property Act embodies the doctrine of part performance. Where a person contracts to transfer immovable property and the transferee takes possession in part performance of the contract, the transferor cannot enforce any right inconsistent with the contract.",
        "category": "property_law"
    },
    {
        "id": "bench_049",
        "question": "What did the Supreme Court hold regarding live-in relationships?",
        "reference_answer": "The Supreme Court has held that live-in relationships between adults are not illegal and fall within the right to life under Article 21. In S. Khushboo v. Kanniammal, the court held that pre-marital sex and live-in relationships, though immoral in the eyes of some, are not illegal.",
        "category": "constitutional_law"
    },
    {
        "id": "bench_050",
        "question": "What is the scope of Article 21 regarding the right to die with dignity?",
        "reference_answer": "The Supreme Court in Common Cause v. Union of India held that the right to die with dignity is a fundamental right under Article 21. The court recognized passive euthanasia and advance medical directives (living wills) as legally valid, allowing a person to refuse medical treatment.",
        "category": "constitutional_law"
    }
]